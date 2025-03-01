// COMBINED COMPARISON TASK //

/////////////////// PART 1: Initialize jsPsych, functions, and variables /////////////////////////////////
// This initialization should happen before the rest of the jsPsych code is called
var jsPsych = initJsPsych({});

// Initialize general variables
// IMPORTANT: THESE ARE THE ONLY VARIABLES THAT SHOULD BE MANUALLY CHANGED, the rest should be adaptive
// Shared across all three comparison tasks
const screen_width = window.innerWidth; 
const screen_height = window.innerHeight;
const linewidth = Math.min(screen_width / 10, screen_height / 10);
var ymid = screen_height / 2;

var block_time_limit = 20000; // set up time limit for each block
var n_trials = 32; // identify number of trials per block

var condition; // Container of string indicating whether condition is same or different
var correct_response; // Numeric container indicating whether subject's response is correct = 1
var block_trial_count = 0; // set up trial count within block
var start_time; // set up timer objects for timeout
var end_timer;
var timeout = 0; // Numeric container indicating whether block timed out at this trial
var subject; // String container of subject ID to be used appended to saved files at the end
var online = 0; // Numeric container indicating whether task is being administered online
var total_correct = 0;
var total_trials = 0;
var experimentStarted = false;

/////////////////// Sub-task 1: Digit Comparison /////////////////////////////////
// Hardcode order of conditions to ensure that subjects still get an equal distribution of same and different even if they only get to beginning trials
var digit_list_3_1 = [{ num1: 417, num2: 467, diff: 1 }, { num1: 663, num2: 963, diff: 1 }, { num1: 459, num2: 459, diff: 0 }, { num1: 431, num2: 431, diff: 0 }, { num1: 166, num2: 163, diff: 1 }, { num1: 563, num2: 863, diff: 1 }, { num1: 491, num2: 498, diff: 1 }, { num1: 796, num2: 726, diff: 1 }, { num1: 935, num2: 935, diff: 0 }, { num1: 235, num2: 235, diff: 0 }, { num1: 331, num2: 331, diff: 0 }, { num1: 984, num2: 984, diff: 0 }, { num1: 638, num2: 636, diff: 1 }, { num1: 448, num2: 448, diff: 0 }, { num1: 843, num2: 863, diff: 1 }, { num1: 549, num2: 549, diff: 0 }, { num1: 432, num2: 432, diff: 0 }, { num1: 741, num2: 641, diff: 1 }, { num1: 649, num2: 649, diff: 0 }, { num1: 411, num2: 611, diff: 1 }, { num1: 592, num2: 592, diff: 0 }, { num1: 682, num2: 642, diff: 1 }, { num1: 133, num2: 173, diff: 1 }, { num1: 744, num2: 144, diff: 1 }, { num1: 763, num2: 713, diff: 1 }, { num1: 311, num2: 311, diff: 0 }, { num1: 781, num2: 751, diff: 1 }, { num1: 849, num2: 849, diff: 0 }, { num1: 356, num2: 756, diff: 1 }, { num1: 668, num2: 668, diff: 0 }, { num1: 497, num2: 497, diff: 0 }, { num1: 161, num2: 161, diff: 0 }];
var digit_list_3_2 = [{ num1: 841, num2: 841, diff: 0 }, { num1: 219, num2: 219, diff: 0 }, { num1: 256, num2: 296, diff: 1 }, { num1: 788, num2: 758, diff: 1 }, { num1: 182, num2: 189, diff: 1 }, { num1: 734, num2: 434, diff: 1 }, { num1: 618, num2: 618, diff: 0 }, { num1: 219, num2: 219, diff: 0 }, { num1: 687, num2: 687, diff: 0 }, { num1: 352, num2: 352, diff: 0 }, { num1: 259, num2: 259, diff: 0 }, { num1: 891, num2: 898, diff: 1 }, { num1: 455, num2: 452, diff: 1 }, { num1: 229, num2: 229, diff: 0 }, { num1: 642, num2: 622, diff: 1 }, { num1: 993, num2: 593, diff: 1 }, { num1: 346, num2: 316, diff: 1 }, { num1: 986, num2: 986, diff: 0 }, { num1: 392, num2: 392, diff: 0 }, { num1: 337, num2: 337, diff: 0 }, { num1: 973, num2: 973, diff: 0 }, { num1: 192, num2: 142, diff: 1 }, { num1: 528, num2: 528, diff: 0 }, { num1: 634, num2: 634, diff: 0 }, { num1: 744, num2: 744, diff: 0 }, { num1: 521, num2: 121, diff: 1 }, { num1: 528, num2: 558, diff: 1 }, { num1: 579, num2: 576, diff: 1 }, { num1: 814, num2: 819, diff: 1 }, { num1: 813, num2: 813, diff: 0 }, { num1: 883, num2: 983, diff: 1 }, { num1: 925, num2: 985, diff: 1 }];
var digit_list_6_1 = [{ num1: 977229, num2: 971229, diff: 1 }, { num1: 162171, num2: 164171, diff: 1 }, { num1: 255463, num2: 255663, diff: 1 }, { num1: 222317, num2: 222317, diff: 0 }, { num1: 258261, num2: 258267, diff: 1 }, { num1: 229175, num2: 229175, diff: 0 }, { num1: 346611, num2: 346615, diff: 1 }, { num1: 844662, num2: 845662, diff: 1 }, { num1: 741863, num2: 711863, diff: 1 }, { num1: 999728, num2: 999728, diff: 0 }, { num1: 524812, num2: 524812, diff: 0 }, { num1: 775187, num2: 775187, diff: 0 }, { num1: 147113, num2: 147113, diff: 0 }, { num1: 895221, num2: 895221, diff: 0 }, { num1: 527951, num2: 527951, diff: 0 }, { num1: 125359, num2: 125358, diff: 1 }, { num1: 441216, num2: 441916, diff: 1 }, { num1: 795177, num2: 793177, diff: 1 }, { num1: 992852, num2: 992872, diff: 1 }, { num1: 169845, num2: 168845, diff: 1 }, { num1: 637853, num2: 634853, diff: 1 }, { num1: 579411, num2: 579411, diff: 0 }, { num1: 163452, num2: 162452, diff: 1 }, { num1: 719395, num2: 719395, diff: 0 }, { num1: 399827, num2: 399827, diff: 0 }, { num1: 318855, num2: 318855, diff: 0 }, { num1: 619429, num2: 619429, diff: 0 }, { num1: 744515, num2: 744595, diff: 1 }, { num1: 471766, num2: 471766, diff: 0 }, { num1: 494459, num2: 497459, diff: 1 }, { num1: 681247, num2: 681247, diff: 0 }, { num1: 435499, num2: 435499, diff: 0 }];
var digit_list_6_2 = [{ num1: 996217, num2: 996217, diff: 0 }, { num1: 833975, num2: 833975, diff: 0 }, { num1: 342677, num2: 342677, diff: 0 }, { num1: 258821, num2: 158821, diff: 1 }, { num1: 286479, num2: 286479, diff: 0 }, { num1: 727632, num2: 728632, diff: 1 }, { num1: 513674, num2: 513774, diff: 1 }, { num1: 889111, num2: 839111, diff: 1 }, { num1: 625865, num2: 625865, diff: 0 }, { num1: 543211, num2: 543211, diff: 0 }, { num1: 391775, num2: 398775, diff: 1 }, { num1: 813789, num2: 813789, diff: 0 }, { num1: 973318, num2: 933318, diff: 1 }, { num1: 461715, num2: 461815, diff: 1 }, { num1: 849238, num2: 849238, diff: 0 }, { num1: 489765, num2: 487765, diff: 1 }, { num1: 995613, num2: 997613, diff: 1 }, { num1: 687836, num2: 687736, diff: 1 }, { num1: 773363, num2: 773363, diff: 0 }, { num1: 541333, num2: 541331, diff: 1 }, { num1: 613419, num2: 633419, diff: 1 }, { num1: 684567, num2: 684567, diff: 0 }, { num1: 699856, num2: 697856, diff: 1 }, { num1: 326321, num2: 726321, diff: 1 }, { num1: 589588, num2: 589581, diff: 1 }, { num1: 348928, num2: 349928, diff: 1 }, { num1: 439228, num2: 439228, diff: 0 }, { num1: 462332, num2: 462332, diff: 0 }, { num1: 371547, num2: 371547, diff: 0 }, { num1: 315242, num2: 315242, diff: 0 }, { num1: 244982, num2: 244982, diff: 0 }, { num1: 487273, num2: 487273, diff: 0 }];
var digit_list_9_1 = [{ num1: 655158545, num2: 655159545, diff: 1 }, { num1: 755631382, num2: 715631382, diff: 1 }, { num1: 429676658, num2: 429676658, diff: 0 }, { num1: 123339491, num2: 123339491, diff: 0 }, { num1: 337264518, num2: 337364518, diff: 1 }, { num1: 774292158, num2: 774292158, diff: 0 }, { num1: 462863977, num2: 462853977, diff: 1 }, { num1: 557441586, num2: 557441586, diff: 0 }, { num1: 638451488, num2: 638451448, diff: 1 }, { num1: 124781993, num2: 124781993, diff: 0 }, { num1: 489253984, num2: 489253984, diff: 0 }, { num1: 612711329, num2: 612711329, diff: 0 }, { num1: 994758884, num2: 994758884, diff: 0 }, { num1: 552982517, num2: 552982717, diff: 1 }, { num1: 894888558, num2: 894888552, diff: 1 }, { num1: 319624678, num2: 319624676, diff: 1 }, { num1: 134884266, num2: 134884286, diff: 1 }, { num1: 668675479, num2: 668675479, diff: 0 }, { num1: 826244837, num2: 826244837, diff: 0 }, { num1: 426825742, num2: 226825742, diff: 1 }, { num1: 696926647, num2: 696926647, diff: 0 }, { num1: 774943459, num2: 774943459, diff: 0 }, { num1: 635584835, num2: 635584135, diff: 1 }, { num1: 221312499, num2: 221312499, diff: 0 }, { num1: 485946123, num2: 485946323, diff: 1 }, { num1: 165385275, num2: 155385275, diff: 1 }, { num1: 371157212, num2: 371157212, diff: 0 }, { num1: 798167258, num2: 798169258, diff: 1 }, { num1: 272798239, num2: 272793239, diff: 1 }, { num1: 355273868, num2: 355273868, diff: 0 }, { num1: 155149126, num2: 155149126, diff: 0 }, { num1: 133862359, num2: 133842359, diff: 1 }];
var digit_list_9_2 = [{ num1: 222379268, num2: 222379263, diff: 1 }, { num1: 241516211, num2: 245516211, diff: 1 }, { num1: 632571458, num2: 632571458, diff: 0 }, { num1: 189683717, num2: 189683717, diff: 0 }, { num1: 683175529, num2: 683175539, diff: 1 }, { num1: 179968566, num2: 179968561, diff: 1 }, { num1: 816765324, num2: 816765324, diff: 0 }, { num1: 788581391, num2: 788581491, diff: 1 }, { num1: 745459366, num2: 745459266, diff: 1 }, { num1: 282974472, num2: 232974472, diff: 1 }, { num1: 561592926, num2: 561592926, diff: 0 }, { num1: 857199262, num2: 857299262, diff: 1 }, { num1: 186179935, num2: 186179935, diff: 0 }, { num1: 283899443, num2: 283899443, diff: 0 }, { num1: 291985964, num2: 291985964, diff: 0 }, { num1: 568315732, num2: 568315732, diff: 0 }, { num1: 288627816, num2: 288687816, diff: 1 }, { num1: 463228513, num2: 263228513, diff: 1 }, { num1: 931558484, num2: 931558484, diff: 0 }, { num1: 374999154, num2: 374991154, diff: 1 }, { num1: 738343986, num2: 738343986, diff: 0 }, { num1: 181943896, num2: 181943896, diff: 0 }, { num1: 235441464, num2: 235441464, diff: 0 }, { num1: 376131532, num2: 376139532, diff: 1 }, { num1: 176544892, num2: 176574892, diff: 1 }, { num1: 153262996, num2: 153262996, diff: 0 }, { num1: 313545498, num2: 313545498, diff: 0 }, { num1: 441981689, num2: 441981689, diff: 0 }, { num1: 442952271, num2: 442952221, diff: 1 }, { num1: 841389785, num2: 851389785, diff: 1 }, { num1: 812196745, num2: 812186745, diff: 1 }, { num1: 693795843, num2: 693795843, diff: 0 }];

/////////////////// Sub-task 2: Letter Comparison /////////////////////////////////
// Hardcode order of conditions to ensure that subjects still get an equal distribution of same and different even if they only get to beginning trials
var letter_list_3_1 = [{ str1: 'DSY', str2: 'DSY', cond: 'same' }, { str1: 'JTF', str2: 'JTF', cond: 'same' }, { str1: 'WHQ', str2: 'WZQ', cond: 'diff' }, { str1: 'THQ', str2: 'THQ', cond: 'same' }, { str1: 'TVD', str2: 'TVD', cond: 'same' }, { str1: 'GJJ', str2: 'RJJ', cond: 'diff' }, { str1: 'KNY', str2: 'KCY', cond: 'diff' }, { str1: 'HVS', str2: 'HVS', cond: 'same' }, { str1: 'JCH', str2: 'JCH', cond: 'same' }, { str1: 'PJG', str2: 'ZJG', cond: 'diff' }, { str1: 'MBQ', str2: 'WBQ', cond: 'diff' }, { str1: 'WXN', str2: 'WXN', cond: 'same' }, { str1: 'PNG', str2: 'KNG', cond: 'diff' }, { str1: 'YPD', str2: 'YPD', cond: 'same' }, { str1: 'VBF', str2: 'VDF', cond: 'diff' }, { str1: 'HDK', str2: 'SDK', cond: 'diff' }, { str1: 'JTZ', str2: 'JTX', cond: 'diff' }, { str1: 'MYP', str2: 'MJP', cond: 'diff' }, { str1: 'ZYK', str2: 'ZYK', cond: 'same' }, { str1: 'XDS', str2: 'XCS', cond: 'diff' }, { str1: 'QXB', str2: 'YXB', cond: 'diff' }, { str1: 'STS', str2: 'STS', cond: 'same' }, { str1: 'HPC', str2: 'HPC', cond: 'same' }, { str1: 'YNM', str2: 'YNJ', cond: 'diff' }, { str1: 'TNR', str2: 'TNR', cond: 'same' }, { str1: 'ZZW', str2: 'ZZW', cond: 'same' }, { str1: 'DQN', str2: 'DFN', cond: 'diff' }, { str1: 'CZL', str2: 'NZL', cond: 'diff' }, { str1: 'VCM', str2: 'VCV', cond: 'diff' }, { str1: 'BLV', str2: 'BLV', cond: 'same' }, { str1: 'PHC', str2: 'PHC', cond: 'same' }, { str1: 'PPK', str2: 'PPK', cond: 'same' }];
var letter_list_3_2 = [{ str1: 'KPB', str2: 'KPS', cond: 'diff' }, { str1: 'JCB', str2: 'JLB', cond: 'diff' }, { str1: 'NGL', str2: 'NGL', cond: 'same' }, { str1: 'RHM', str2: 'RHM', cond: 'same' }, { str1: 'WBY', str2: 'WBN', cond: 'diff' }, { str1: 'QCX', str2: 'QCX', cond: 'same' }, { str1: 'MXP', str2: 'MYP', cond: 'diff' }, { str1: 'KHN', str2: 'KHN', cond: 'same' }, { str1: 'ZCM', str2: 'TCM', cond: 'diff' }, { str1: 'GFP', str2: 'GFP', cond: 'same' }, { str1: 'HHV', str2: 'HKV', cond: 'diff' }, { str1: 'WGW', str2: 'WGW', cond: 'same' }, { str1: 'XPW', str2: 'XXW', cond: 'diff' }, { str1: 'GJX', str2: 'GJL', cond: 'diff' }, { str1: 'HDY', str2: 'HDY', cond: 'same' }, { str1: 'FLQ', str2: 'FLQ', cond: 'same' }, { str1: 'MPM', str2: 'MPM', cond: 'same' }, { str1: 'DHS', str2: 'DHP', cond: 'diff' }, { str1: 'GHW', str2: 'GHW', cond: 'same' }, { str1: 'TQN', str2: 'TQN', cond: 'same' }, { str1: 'XCV', str2: 'XKV', cond: 'diff' }, { str1: 'GSP', str2: 'GSP', cond: 'same' }, { str1: 'PWF', str2: 'QWF', cond: 'diff' }, { str1: 'TTP', str2: 'TTP', cond: 'same' }, { str1: 'GZT', str2: 'GZM', cond: 'diff' }, { str1: 'DKV', str2: 'PKV', cond: 'diff' }, { str1: 'JRL', str2: 'JRC', cond: 'diff' }, { str1: 'ZCQ', str2: 'ZCR', cond: 'diff' }, { str1: 'YHN', str2: 'YHQ', cond: 'diff' }, { str1: 'TCV', str2: 'TCV', cond: 'same' }, { str1: 'ZBW', str2: 'ZBW', cond: 'same' }, { str1: 'LZJ', str2: 'LZJ', cond: 'same' }];
var letter_list_6_1 = [{ str1: 'NQJDBB', str2: 'NQJDHB', cond: 'diff' }, { str1: 'BVDTMC', str2: 'BVDTMC', cond: 'same' }, { str1: 'VKYJTJ', str2: 'VKYJTJ', cond: 'same' }, { str1: 'XSYWVH', str2: 'XFYWVH', cond: 'diff' }, { str1: 'TCZFKK', str2: 'TCZFKK', cond: 'same' }, { str1: 'QYNDSR', str2: 'QYNDSR', cond: 'same' }, { str1: 'ZYGVDV', str2: 'ZJGVDV', cond: 'diff' }, { str1: 'MGVWXL', str2: 'MGVWPL', cond: 'diff' }, { str1: 'GYWFKG', str2: 'GDWFKG', cond: 'diff' }, { str1: 'MDCDTK', str2: 'MDCDTK', cond: 'same' }, { str1: 'ZNSWPY', str2: 'ZNSWPY', cond: 'same' }, { str1: 'QSPHXH', str2: 'QSPHXH', cond: 'same' }, { str1: 'GBWTMJ', str2: 'GBWTMN', cond: 'diff' }, { str1: 'GWLGGN', str2: 'TWLGGN', cond: 'diff' }, { str1: 'RRSYKS', str2: 'RRSVKS', cond: 'diff' }, { str1: 'LFDPPV', str2: 'LFDPPV', cond: 'same' }, { str1: 'FSMYQY', str2: 'FSMYJY', cond: 'diff' }, { str1: 'NSHMBB', str2: 'NSHMXB', cond: 'diff' }, { str1: 'SBSSYP', str2: 'SBSSYP', cond: 'same' }, { str1: 'FYVPWH', str2: 'WYVPWH', cond: 'diff' }, { str1: 'KBSXGS', str2: 'KBSXQS', cond: 'diff' }, { str1: 'WTJKYQ', str2: 'WTJKYQ', cond: 'same' }, { str1: 'GXPLTJ', str2: 'GXPLTJ', cond: 'same' }, { str1: 'RKJRND', str2: 'RKJRND', cond: 'same' }, { str1: 'HDYGKW', str2: 'PDYGKW', cond: 'diff' }, { str1: 'FTKSHW', str2: 'FTKDHW', cond: 'diff' }, { str1: 'RXSXQF', str2: 'RXSXQT', cond: 'diff' }, { str1: 'BNBRQJ', str2: 'BNBRQJ', cond: 'same' }, { str1: 'XZMJBS', str2: 'XZMJBS', cond: 'same' }, { str1: 'CMGHTY', str2: 'CNGHTY', cond: 'diff' }, { str1: 'KJGCNV', str2: 'KJGCNV', cond: 'same' }, { str1: 'BPKDGK', str2: 'BPKDGK', cond: 'same' }];
var letter_list_6_2 = [{ str1: 'HWTFHW', str2: 'HWTFHK', cond: 'diff' }, { str1: 'YMXGYS', str2: 'SMXGYS', cond: 'diff' }, { str1: 'RFDZZJ', str2: 'RFDMZJ', cond: 'diff' }, { str1: 'LBHYDR', str2: 'LBHYDR', cond: 'same' }, { str1: 'MZTLMP', str2: 'NZTLMP', cond: 'diff' }, { str1: 'VFFPRW', str2: 'VFFPRW', cond: 'same' }, { str1: 'MKCKRZ', str2: 'MKCKRZ', cond: 'same' }, { str1: 'RGQPSM', str2: 'RGQPSM', cond: 'same' }, { str1: 'CWJNWM', str2: 'CWJNWM', cond: 'same' }, { str1: 'KDYFSK', str2: 'KDYFSK', cond: 'same' }, { str1: 'MXVTXF', str2: 'MXVDXF', cond: 'diff' }, { str1: 'FJLPQG', str2: 'FJLPQG', cond: 'same' }, { str1: 'LPPLQS', str2: 'LPPLQT', cond: 'diff' }, { str1: 'LCTPQH', str2: 'LCTPQH', cond: 'same' }, { str1: 'VGBXZZ', str2: 'VGXXZZ', cond: 'diff' }, { str1: 'RLRGRJ', str2: 'RLMGRJ', cond: 'diff' }, { str1: 'RLTSKX', str2: 'RLNSKX', cond: 'diff' }, { str1: 'TFRRWM', str2: 'TKRRWM', cond: 'diff' }, { str1: 'VYYLZC', str2: 'VYYLZQ', cond: 'diff' }, { str1: 'NTQNTS', str2: 'MTQNTS', cond: 'diff' }, { str1: 'DCMBRR', str2: 'RCMBRR', cond: 'diff' }, { str1: 'WYDCPB', str2: 'WYDCPB', cond: 'same' }, { str1: 'PYVGXM', str2: 'PYVGXM', cond: 'same' }, { str1: 'JKDJKV', str2: 'JKDJKV', cond: 'same' }, { str1: 'STCBTZ', str2: 'STCBTZ', cond: 'same' }, { str1: 'DQPKYX', str2: 'DQPKRX', cond: 'diff' }, { str1: 'LMGTPV', str2: 'LMGTPV', cond: 'same' }, { str1: 'VDSYTN', str2: 'VDLYTN', cond: 'diff' }, { str1: 'ZPKDQN', str2: 'ZPKDQN', cond: 'same' }, { str1: 'BYTVVV', str2: 'BYTVVV', cond: 'same' }, { str1: 'DMQJFH', str2: 'DMQJVH', cond: 'diff' }, { str1: 'KKFCYJ', str2: 'KKFCYJ', cond: 'same' }];
var letter_list_9_1 = [{ str1: 'NPFTYJLBB', str2: 'NPFTYJLBQ', cond: 'diff' }, { str1: 'GPYMBKLSL', str2: 'GPYMBKLSL', cond: 'same' }, { str1: 'JJWBHGSHH', str2: 'JJWBJGSHH', cond: 'diff' }, { str1: 'PLLBPZKYK', str2: 'PLLBPZKYK', cond: 'same' }, { str1: 'DYCNSFXWR', str2: 'DYCNSFXWD', cond: 'diff' }, { str1: 'RCMQHKGZS', str2: 'RCMGHKGZS', cond: 'diff' }, { str1: 'XHFMLVNNP', str2: 'XHFMLVNNP', cond: 'same' }, { str1: 'RVYXTDPLM', str2: 'RVYXTDPLM', cond: 'same' }, { str1: 'SFQPTTNXK', str2: 'SFQPTTNXK', cond: 'same' }, { str1: 'GCHLMFJYH', str2: 'PCHLMFJYH', cond: 'diff' }, { str1: 'BNWCJZXJD', str2: 'BNWCJZXJD', cond: 'same' }, { str1: 'XKGHMRLDC', str2: 'XCGHMRLDC', cond: 'diff' }, { str1: 'SHDNKMXXF', str2: 'SHDNHMXXF', cond: 'diff' }, { str1: 'WRMNNTJBS', str2: 'DRMNNTJBS', cond: 'diff' }, { str1: 'VSMPBYFKS', str2: 'VSMPBYFKS', cond: 'same' }, { str1: 'ZTLHRYLWX', str2: 'ZTLHRYLWX', cond: 'same' }, { str1: 'KVKBWMKVL', str2: 'KVKBWMKVL', cond: 'same' }, { str1: 'YFLHKPSLS', str2: 'YFLRKPSLS', cond: 'diff' }, { str1: 'FVTCCJQSZ', str2: 'FVTCCJQSZ', cond: 'same' }, { str1: 'ZMMGGKPXN', str2: 'ZMMGGKPXN', cond: 'same' }, { str1: 'QMGLXRDHZ', str2: 'QMJLXRDHZ', cond: 'diff' }, { str1: 'SHDZMMZZM', str2: 'SHDZMCZZM', cond: 'diff' }, { str1: 'QQQCZKBBG', str2: 'QQQCZHBBG', cond: 'diff' }, { str1: 'DGGLYSYGS', str2: 'JGGLYSYGS', cond: 'diff' }, { str1: 'BBPFRXNJT', str2: 'BBPFRXNJT', cond: 'same' }, { str1: 'DSXJDPJTP', str2: 'DSXJDPJTP', cond: 'same' }, { str1: 'JNCXYNJHY', str2: 'JNCXYNJHX', cond: 'diff' }, { str1: 'BRSCBJHMZ', str2: 'BRSCBJHMZ', cond: 'same' }, { str1: 'BNJVWLWRF', str2: 'BNCVWLWRF', cond: 'diff' }, { str1: 'NPDNFQBBK', str2: 'RPDNFQBBK', cond: 'diff' }, { str1: 'HWCQWWSTV', str2: 'HWCQWWSTV', cond: 'same' }, { str1: 'YVCWTYRZL', str2: 'YVCWTYRZL', cond: 'same' }];
var letter_list_9_2 = [{ str1: 'GWQSGGLHK', str2: 'GWQSGGLHK', cond: 'same' }, { str1: 'SBLDMVRFM', str2: 'SBLDMVRFW', cond: 'diff' }, { str1: 'SPFLQYVCB', str2: 'SPFLQYVCB', cond: 'same' }, { str1: 'HNSHSKQYW', str2: 'HNSHSKQYW', cond: 'same' }, { str1: 'RFXFPYNKW', str2: 'RFXFSYNKW', cond: 'diff' }, { str1: 'GPZPZPNXV', str2: 'GPZPZRNXV', cond: 'diff' }, { str1: 'KSXNHHBPD', str2: 'KSXNHHBPD', cond: 'same' }, { str1: 'WTSYSQSBB', str2: 'WTJYSQSBB', cond: 'diff' }, { str1: 'KQKBBTHPB', str2: 'KQKBTTHPB', cond: 'diff' }, { str1: 'VHYRDCYRP', str2: 'VHYRDCYRP', cond: 'same' }, { str1: 'JFNVGKFMQ', str2: 'JFNVGKFWQ', cond: 'diff' }, { str1: 'CWTLFRDLL', str2: 'CWTLLRDLL', cond: 'diff' }, { str1: 'DBGMSFTPS', str2: 'DBGMSFTYS', cond: 'diff' }, { str1: 'GJSFQNPJS', str2: 'GJSFQNPJS', cond: 'same' }, { str1: 'KQSYSHGSZ', str2: 'KQSYSHGSZ', cond: 'same' }, { str1: 'LLFFBRTCY', str2: 'LLFFBRTCY', cond: 'same' }, { str1: 'TYPDHSSHH', str2: 'CYPDHSSHH', cond: 'diff' }, { str1: 'FMKJNZKNY', str2: 'FMKJNZKNY', cond: 'same' }, { str1: 'YVCGZNBRK', str2: 'YVCGZNBRK', cond: 'same' }, { str1: 'ZJPMKYWWX', str2: 'ZJTMKYWWX', cond: 'diff' }, { str1: 'BRQNQKHCV', str2: 'BCQNQKHCV', cond: 'diff' }, { str1: 'RGGTZTXRS', str2: 'RGGTZTXNS', cond: 'diff' }, { str1: 'NRNVRKCHK', str2: 'NHNVRKCHK', cond: 'diff' }, { str1: 'XBQBQPSBN', str2: 'XBQBQPSBN', cond: 'same' }, { str1: 'DMRCNNFPT', str2: 'DMRDNNFPT', cond: 'diff' }, { str1: 'NCKHNRLVW', str2: 'NCKHNRLQW', cond: 'diff' }, { str1: 'FRSTSYPVY', str2: 'FRSTSYPVY', cond: 'same' }, { str1: 'QYNGVTJZG', str2: 'QYNGVTJZG', cond: 'same' }, { str1: 'SFGLFJPDR', str2: 'SFFLFJPDR', cond: 'diff' }, { str1: 'GRGTXYCFP', str2: 'GRGTXYCFP', cond: 'same' }, { str1: 'QPSQBSHFQ', str2: 'QPSQBSHFQ', cond: 'same' }, { str1: 'DSXXLCMVB', str2: 'DSXXLCMVB', cond: 'same' }];

/////////////////// Sub-task 3: Pattern Comparison /////////////////////////////////
var startposindex; // Array containing positions of lines that will be shown on the screen
var coords = [ // x1: starting x coordinate; x2: end x coordinate; y1: start y coordinate; y2: end y coordinate
    {x1: 0, x2: linewidth, y1: 0, y2: 0}, // Horizonal Row 1 (top line row)
    {x1: linewidth, x2: linewidth*2, y1: 0, y2: 0},
    {x1: linewidth*2, x2: linewidth*3, y1: 0, y2: 0}, 
    {x1: 0, x2: 0, y1: 0, y2: linewidth}, // Vertical Row 1 (top line columns)
    {x1: linewidth, x2: linewidth, y1: 0, y2: linewidth}, 
    {x1: linewidth*2, x2: linewidth*2, y1: 0, y2: linewidth}, 
    {x1: linewidth*3, x2: linewidth*3, y1: 0, y2: linewidth}, 
    {x1: 0, x2: linewidth, y1: linewidth, y2: linewidth}, // Horizonal Row 2
    {x1: linewidth, x2: linewidth*2, y1: linewidth, y2: linewidth}, 
    {x1: linewidth*2, x2: linewidth*3, y1: linewidth, y2: linewidth},
    {x1: 0, x2: 0, y1: linewidth, y2: linewidth*2}, // Vertical Row 2
    {x1: linewidth, x2: linewidth, y1: linewidth, y2: linewidth*2}, 
    {x1: linewidth*2, x2: linewidth*2, y1: linewidth, y2: linewidth*2}, 
    {x1: linewidth*3, x2: linewidth*3, y1: linewidth, y2: linewidth*2}, 
    {x1: 0, x2: linewidth, y1: linewidth*2, y2: linewidth*2}, // Horizonal Row 3
    {x1: linewidth, x2: linewidth*2, y1: linewidth*2, y2: linewidth*2}, 
    {x1: linewidth*2, x2: linewidth*3, y1: linewidth*2, y2: linewidth*2},
    {x1: 0, x2: 0, y1: linewidth*2, y2: linewidth*3}, // Vertical Row 3
    {x1: linewidth, x2: linewidth, y1: linewidth*2, y2: linewidth*3}, 
    {x1: linewidth*2, x2: linewidth*2, y1: linewidth*2, y2: linewidth*3}, 
    {x1: linewidth*3, x2: linewidth*3, y1: linewidth*2, y2: linewidth*3}, 
    {x1: 0, x2: linewidth, y1: linewidth*3, y2: linewidth*3}, // Horizonal Row 4 (bottom line row)
    {x1: linewidth, x2: linewidth*2, y1: linewidth*3, y2: linewidth*3}, 
    {x1: linewidth*2, x2: linewidth*3, y1: linewidth*3, y2: linewidth*3}
];

// Hardcode order of conditions to ensure that subjects still get an equal distribution of same and different even if they only get to beginning trials
var pattern_list_3_1 = [{ posindex: [5, 20, 15, 19], diff: 1, cr: 'j'}, { posindex: [24, 13, 17, 5], diff: 0, cr: 'f'}, { posindex: [2, 19, 16, 17], diff: 1, cr: 'j'}, { posindex: [3, 4, 15, 14], diff: 0, cr: 'f'}, { posindex: [23, 21, 16, 10], diff: 1, cr: 'j'}, { posindex: [12, 6, 8, 9], diff: 1, cr: 'j'}, { posindex: [22, 8, 2, 4], diff: 0, cr: 'f'}, { posindex: [15, 19, 1, 20], diff: 0, cr: 'f'}, { posindex: [12, 2, 4, 19], diff: 1, cr: 'j'}, { posindex: [24, 18, 1, 6], diff: 0, cr: 'f'}, { posindex: [18, 16, 17, 13], diff: 1, cr: 'j'}, { posindex: [20, 15, 5, 10], diff: 0, cr: 'f'}, { posindex: [6, 8, 1, 4], diff: 0, cr: 'f'}, { posindex: [12, 14, 19, 2], diff: 1, cr: 'j'}, { posindex: [9, 10, 7, 8], diff: 1, cr: 'j'}, { posindex: [11, 6, 9, 18], diff: 0, cr: 'f'}, { posindex: [18, 3, 1, 16], diff: 1, cr: 'j'}, { posindex: [6, 24, 15, 9], diff: 0, cr: 'f'}, { posindex: [16, 5, 18, 17], diff: 0, cr: 'f'}, { posindex: [20, 5, 19, 18], diff: 0, cr: 'f'}, { posindex: [7, 9, 12, 6], diff: 1, cr: 'j'}, { posindex: [22, 23, 20, 6], diff: 1, cr: 'j'}, { posindex: [23, 22, 12, 7], diff: 0, cr: 'f'}, { posindex: [3, 7, 1, 24], diff: 1, cr: 'j'}, { posindex: [3, 22, 5, 2], diff: 0, cr: 'f'}, { posindex: [17, 20, 12, 19], diff: 0, cr: 'f'}, { posindex: [13, 15, 2, 12], diff: 0, cr: 'f'}, { posindex: [23, 2, 7, 20], diff: 0, cr: 'f'}, { posindex: [6, 23, 21, 14], diff: 1, cr: 'j'}, { posindex: [12, 11, 6, 9], diff: 1, cr: 'j'}, { posindex: [13, 18, 11, 4], diff: 1, cr: 'j'}, { posindex: [18, 23, 12, 22], diff: 1, cr: 'j'}]; 
var pattern_list_3_2 = [{ posindex: [22, 9, 10, 2], diff: 1, cr: 'j'}, { posindex: [21, 7, 18, 3], diff: 1, cr: 'j'}, { posindex: [1, 12, 5, 16], diff: 1, cr: 'j'}, { posindex: [11, 16, 8, 24], diff: 0, cr: 'f'}, { posindex: [18, 1, 3, 22], diff: 1, cr: 'j'}, { posindex: [5, 19, 6, 24], diff: 0, cr: 'f'}, { posindex: [17, 8, 18, 5], diff: 0, cr: 'f'}, { posindex: [19, 22, 11, 10], diff: 1, cr: 'j'}, { posindex: [24, 16, 15, 20], diff: 1, cr: 'j'}, { posindex: [1, 4, 12, 7], diff: 1, cr: 'j'}, { posindex: [19, 5, 16, 18], diff: 0, cr: 'f'}, { posindex: [21, 8, 3, 13], diff: 0, cr: 'f'}, { posindex: [4, 2, 23, 5], diff: 1, cr: 'j'}, { posindex: [11, 17, 3, 5], diff: 0, cr: 'f'}, { posindex: [7, 14, 6, 19], diff: 0, cr: 'f'}, { posindex: [20, 7, 16, 11], diff: 0, cr: 'f'}, { posindex: [1, 24, 2, 13], diff: 1, cr: 'j'}, { posindex: [3, 4, 14, 18], diff: 1, cr: 'j'}, { posindex: [9, 16, 21, 22], diff: 0, cr: 'f'}, { posindex: [12, 17, 4, 5], diff: 0, cr: 'f'}, { posindex: [2, 5, 7, 10], diff: 1, cr: 'j'}, { posindex: [4, 22, 19, 20], diff: 1, cr: 'j'}, { posindex: [7, 21, 13, 23], diff: 1, cr: 'j'}, { posindex: [3, 17, 22, 1], diff: 0, cr: 'f'}, { posindex: [12, 11, 20, 5], diff: 1, cr: 'j'}, { posindex: [16, 5, 14, 19], diff: 1, cr: 'j'}, { posindex: [21, 8, 17, 6], diff: 0, cr: 'f'}, { posindex: [23, 17, 10, 22], diff: 1, cr: 'j'}, { posindex: [12, 9, 22, 19], diff: 0, cr: 'f'}, { posindex: [1, 10, 21, 5], diff: 0, cr: 'f'}, { posindex: [19, 3, 20, 11], diff: 0, cr: 'f'}, { posindex: [10, 12, 3, 15], diff: 0, cr: 'f'}]; 
var pattern_list_6_1 = [{ posindex: [24, 20, 9, 11, 23, 3, 4], diff: 0, cr: 'f'}, { posindex: [20, 23, 11, 4, 14, 18, 5], diff: 0, cr: 'f'}, { posindex: [12, 14, 13, 21, 3, 20, 9], diff: 0, cr: 'f'}, { posindex: [12, 10, 11, 3, 19, 24, 1], diff: 0, cr: 'f'}, { posindex: [22, 24, 2, 8, 18, 11, 12], diff: 1, cr: 'j'}, { posindex: [10, 1, 24, 12, 11, 17, 5], diff: 1, cr: 'j'}, { posindex: [12, 18, 1, 9, 13, 10, 22], diff: 1, cr: 'j'}, { posindex: [2, 20, 12, 19, 22, 4, 1], diff: 0, cr: 'f'}, { posindex: [6, 10, 9, 16, 17, 8, 4], diff: 0, cr: 'f'}, { posindex: [4, 11, 13, 20, 21, 24, 3], diff: 1, cr: 'j'}, { posindex: [13, 10, 12, 19, 17, 22, 1], diff: 0, cr: 'f'}, { posindex: [15, 7, 17, 5, 11, 20, 14], diff: 1, cr: 'j'}, { posindex: [22, 17, 18, 4, 13, 9, 12], diff: 1, cr: 'j'}, { posindex: [8, 12, 19, 11, 10, 21, 7], diff: 1, cr: 'j'}, { posindex: [10, 24, 5, 11, 20, 15, 21], diff: 0, cr: 'f'}, { posindex: [4, 6, 10, 2, 13, 8, 16], diff: 1, cr: 'j'}, { posindex: [4, 22, 12, 9, 14, 10, 11], diff: 0, cr: 'f'}, { posindex: [15, 17, 8, 24, 19, 4, 3], diff: 0, cr: 'f'}, { posindex: [7, 1, 12, 18, 10, 24, 21], diff: 0, cr: 'f'}, { posindex: [3, 23, 6, 1, 17, 4, 13], diff: 0, cr: 'f'}, { posindex: [1, 17, 6, 15, 22, 5, 21], diff: 1, cr: 'j'}, { posindex: [3, 12, 19, 9, 7, 8, 14], diff: 0, cr: 'f'}, { posindex: [9, 2, 1, 14, 4, 8, 21], diff: 0, cr: 'f'}, { posindex: [16, 19, 8, 24, 3, 22, 21], diff: 1, cr: 'j'}, { posindex: [3, 7, 18, 2, 10, 12, 13], diff: 1, cr: 'j'}, { posindex: [10, 3, 4, 20, 18, 6, 13], diff: 1, cr: 'j'}, { posindex: [15, 24, 8, 4, 23, 16, 10], diff: 0, cr: 'f'}, { posindex: [11, 8, 13, 2, 10, 24, 21], diff: 1, cr: 'j'}, { posindex: [17, 4, 13, 1, 7, 10, 3], diff: 1, cr: 'j'}, { posindex: [18, 13, 21, 11, 24, 5, 1], diff: 1, cr: 'j'}, { posindex: [6, 18, 20, 8, 17, 16, 15], diff: 0, cr: 'f'}, { posindex: [5, 9, 11, 6, 24, 10, 17], diff: 1, cr: 'j'}]; 
var pattern_list_6_2 = [{ posindex: [22, 5, 9, 21, 10, 16, 2], diff: 1, cr: 'j'}, { posindex: [7, 18, 9, 11, 5, 19, 12], diff: 0, cr: 'f'}, { posindex: [24, 3, 14, 5, 11, 12, 15], diff: 1, cr: 'j'}, { posindex: [14, 9, 17, 20, 5, 16, 23], diff: 0, cr: 'f'}, { posindex: [9, 8, 5, 21, 11, 22, 6], diff: 1, cr: 'j'}, { posindex: [7, 13, 24, 21, 22, 8, 18], diff: 1, cr: 'j'}, { posindex: [12, 17, 9, 8, 19, 10, 6], diff: 1, cr: 'j'}, { posindex: [20, 15, 16, 14, 17, 5, 3], diff: 0, cr: 'f'}, { posindex: [9, 11, 13, 8, 19, 23, 17], diff: 0, cr: 'f'}, { posindex: [5, 13, 10, 16, 23, 19, 8], diff: 0, cr: 'f'}, { posindex: [2, 12, 8, 5, 20, 13, 21], diff: 1, cr: 'j'}, { posindex: [4, 12, 18, 7, 16, 17, 11], diff: 1, cr: 'j'}, { posindex: [6, 21, 23, 17, 18, 2, 5], diff: 0, cr: 'f'}, { posindex: [10, 14, 15, 22, 1, 24, 13], diff: 1, cr: 'j'}, { posindex: [9, 1, 6, 16, 4, 10, 3], diff: 0, cr: 'f'}, { posindex: [15, 23, 2, 17, 22, 16, 7], diff: 0, cr: 'f'}, { posindex: [3, 8, 17, 14, 2, 4, 22], diff: 1, cr: 'j'}, { posindex: [13, 18, 21, 1, 19, 4, 3], diff: 1, cr: 'j'}, { posindex: [23, 1, 12, 17, 24, 7, 3], diff: 1, cr: 'j'}, { posindex: [8, 24, 9, 15, 12, 3, 5], diff: 0, cr: 'f'}, { posindex: [2, 9, 11, 8, 7, 22, 21], diff: 1, cr: 'j'}, { posindex: [10, 24, 17, 18, 2, 11, 23], diff: 0, cr: 'f'}, { posindex: [2, 18, 24, 6, 10, 3, 12], diff: 1, cr: 'j'}, { posindex: [12, 7, 8, 10, 1, 11, 21], diff: 0, cr: 'f'}, { posindex: [8, 13, 15, 21, 12, 16, 17], diff: 1, cr: 'j'}, { posindex: [17, 24, 13, 2, 7, 21, 14], diff: 0, cr: 'f'}, { posindex: [16, 3, 17, 24, 11, 7, 18], diff: 0, cr: 'f'}, { posindex: [16, 10, 3, 24, 14, 13, 9], diff: 0, cr: 'f'}, { posindex: [14, 16, 13, 11, 15, 1, 18], diff: 0, cr: 'f'}, { posindex: [19, 17, 24, 12, 4, 20, 2], diff: 0, cr: 'f'}, { posindex: [13, 15, 14, 6, 20, 8, 18], diff: 1, cr: 'j'}, { posindex: [12, 7, 4, 11, 1, 21, 13], diff: 1, cr: 'j'}];
var pattern_list_9_1 = [{ posindex: [22, 15, 13, 18, 24, 16, 1, 3, 14, 4], diff: 1, cr: 'j'}, { posindex: [15, 9, 23, 5, 10, 13, 14, 7, 18, 12], diff: 0, cr: 'f'}, { posindex: [1, 15, 4, 2, 12, 5, 18, 23, 7, 21], diff: 0, cr: 'f'}, { posindex: [12, 21, 9, 13, 8, 20, 10, 14, 15, 1], diff: 0, cr: 'f'}, { posindex: [21, 20, 22, 9, 8, 2, 3, 10, 19, 23], diff: 1, cr: 'j'}, { posindex: [20, 23, 24, 4, 12, 11, 9, 2, 22, 7], diff: 1, cr: 'j'}, { posindex: [10, 13, 3, 21, 8, 18, 9, 5, 24, 22], diff: 0, cr: 'f'}, { posindex: [18, 17, 16, 11, 5, 3, 4, 12, 8, 23], diff: 0, cr: 'f'}, { posindex: [20, 22, 15, 7, 19, 9, 12, 24, 3, 14], diff: 1, cr: 'j'}, { posindex: [17, 18, 19, 2, 7, 14, 20, 13, 3, 24], diff: 1, cr: 'j'}, { posindex: [17, 10, 19, 22, 15, 8, 4, 5, 3, 1], diff: 1, cr: 'j'}, { posindex: [24, 22, 18, 9, 15, 3, 6, 10, 17, 2], diff: 0, cr: 'f'}, { posindex: [4, 24, 17, 16, 1, 10, 8, 7, 6, 5], diff: 1, cr: 'j'}, { posindex: [11, 5, 7, 16, 20, 2, 1, 9, 24, 23], diff: 0, cr: 'f'}, { posindex: [12, 3, 2, 5, 24, 18, 9, 1, 4, 21], diff: 1, cr: 'j'}, { posindex: [21, 18, 20, 19, 22, 10, 4, 15, 7, 6], diff: 0, cr: 'f'}, { posindex: [19, 21, 16, 12, 4, 3, 15, 20, 11, 7], diff: 1, cr: 'j'}, { posindex: [11, 12, 14, 9, 20, 4, 3, 7, 10, 6], diff: 1, cr: 'j'}, { posindex: [17, 18, 6, 23, 11, 22, 15, 20, 12, 24], diff: 0, cr: 'f'}, { posindex: [10, 14, 12, 21, 6, 24, 4, 19, 1, 16], diff: 1, cr: 'j'}, { posindex: [16, 13, 7, 24, 14, 10, 20, 17, 4, 1], diff: 0, cr: 'f'}, { posindex: [18, 20, 15, 22, 6, 16, 10, 1, 19, 24], diff: 0, cr: 'f'}, { posindex: [1, 22, 17, 7, 5, 20, 2, 11, 4, 21], diff: 0, cr: 'f'}, { posindex: [2, 19, 16, 11, 18, 6, 15, 23, 4, 14], diff: 1, cr: 'j'}, { posindex: [23, 12, 24, 19, 14, 1, 13, 10, 11, 15], diff: 1, cr: 'j'}, { posindex: [12, 18, 4, 16, 8, 24, 9, 11, 20, 13], diff: 0, cr: 'f'}, { posindex: [19, 2, 9, 7, 22, 21, 13, 12, 16, 3], diff: 0, cr: 'f'}, { posindex: [23, 10, 7, 1, 20, 13, 19, 15, 2, 22], diff: 1, cr: 'j'}, { posindex: [20, 24, 2, 3, 13, 19, 5, 11, 1, 6], diff: 0, cr: 'f'}, { posindex: [8, 12, 16, 23, 14, 11, 10, 13, 5, 6], diff: 1, cr: 'j'}, { posindex: [12, 3, 23, 15, 19, 5, 24, 6, 16, 9], diff: 0, cr: 'f'}, { posindex: [23, 1, 19, 3, 10, 7, 21, 24, 18, 2], diff: 1, cr: 'j'}]; 
var pattern_list_9_2 = [{ posindex: [3, 16, 20, 15, 19, 4, 8, 17, 7, 12], diff: 0, cr: 'f'}, { posindex: [10, 6, 16, 13, 23, 14, 2, 15, 12, 3], diff: 1, cr: 'j'}, { posindex: [11, 4, 1, 19, 2, 14, 3, 21, 20, 9], diff: 0, cr: 'f'}, { posindex: [18, 14, 9, 13, 20, 2, 7, 19, 16, 17], diff: 0, cr: 'f'}, { posindex: [4, 22, 23, 24, 13, 7, 6, 19, 2, 12], diff: 1, cr: 'j'}, { posindex: [20, 14, 21, 5, 22, 11, 13, 8, 3, 19], diff: 1, cr: 'j'}, { posindex: [14, 23, 15, 5, 6, 4, 10, 7, 1, 24], diff: 0, cr: 'f'}, { posindex: [20, 8, 23, 11, 2, 3, 9, 16, 24, 21], diff: 0, cr: 'f'}, { posindex: [13, 21, 6, 4, 16, 10, 22, 1, 9, 5], diff: 1, cr: 'j'}, { posindex: [13, 6, 10, 23, 15, 8, 14, 16, 1, 7], diff: 1, cr: 'j'}, { posindex: [3, 21, 24, 10, 20, 8, 16, 18, 7, 2], diff: 1, cr: 'j'}, { posindex: [12, 3, 21, 20, 11, 9, 2, 4, 5, 17], diff: 1, cr: 'j'}, { posindex: [23, 1, 13, 11, 14, 24, 6, 22, 19, 12], diff: 1, cr: 'j'}, { posindex: [18, 16, 9, 8, 22, 5, 6, 4, 1, 13], diff: 0, cr: 'f'}, { posindex: [24, 7, 14, 22, 9, 18, 3, 1, 21, 10], diff: 0, cr: 'f'}, { posindex: [22, 24, 8, 1, 19, 9, 3, 7, 15, 10], diff: 0, cr: 'f'}, { posindex: [11, 24, 16, 23, 5, 10, 3, 21, 7, 13], diff: 1, cr: 'j'}, { posindex: [22, 12, 21, 13, 23, 14, 2, 11, 15, 24], diff: 1, cr: 'j'}, { posindex: [10, 18, 9, 2, 5, 21, 24, 1, 15, 3], diff: 0, cr: 'f'}, { posindex: [2, 18, 21, 19, 3, 23, 17, 15, 14, 12], diff: 1, cr: 'j'}, { posindex: [13, 6, 18, 15, 11, 5, 16, 2, 21, 9], diff: 0, cr: 'f'}, { posindex: [23, 20, 17, 15, 10, 8, 7, 2, 16, 1], diff: 0, cr: 'f'}, { posindex: [22, 6, 19, 2, 4, 9, 16, 18, 23, 8], diff: 1, cr: 'j'}, { posindex: [8, 14, 2, 17, 9, 12, 10, 22, 11, 5], diff: 0, cr: 'f'}, { posindex: [1, 24, 23, 16, 19, 7, 3, 20, 12, 14], diff: 0, cr: 'f'}, { posindex: [4, 7, 14, 20, 9, 24, 16, 19, 3, 21], diff: 0, cr: 'f'}, { posindex: [19, 14, 4, 15, 8, 13, 7, 9, 1, 17], diff: 1, cr: 'j'}, { posindex: [22, 15, 2, 8, 6, 3, 17, 4, 13, 19], diff: 0, cr: 'f'}, { posindex: [9, 14, 16, 11, 15, 2, 5, 7, 21, 22], diff: 0, cr: 'f'}, { posindex: [2, 11, 23, 17, 5, 16, 8, 22, 10, 6], diff: 1, cr: 'j'}, { posindex: [24, 4, 12, 11, 23, 22, 13, 8, 1, 6], diff: 1, cr: 'j'}, { posindex: [4, 18, 14, 20, 17, 11, 8, 16, 24, 22], diff: 1, cr: 'j'}];

/////////////////// Functions /////////////////////////////////
// Function to create stimulus on the screen
function createStimulus(item1, itme2) {
    return `<p class="stimulus-text">${item1}&emsp;&emsp;&emsp;&emsp;&emsp;${itme2}</p>`;
}

// Function to play sound
function playSound(filename) {
    let audio = new Audio(`public/audios/${filename}.mp3`);
    audio.play();
}

// Function to draw the patterns on the screen
function drawPatterns(c) {
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";

    for (i = 0; i < startposindex.length - 1; i++) {
        var x1 = coords[startposindex[i] - 1].x1 + screen_width/8; // Adding screen_width/8 displaces figure horizontally
        var x2 = coords[startposindex[i] - 1].x2 + screen_width/8; 
        var y1 = coords[startposindex[i] - 1].y1 + ymid - 1.5*linewidth; // Adding ymid - 1.5*linewidth displaces figure vertically
        var y2 = coords[startposindex[i] - 1].y2 + ymid - 1.5*linewidth;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    switch(condition) {
        case "same":
            
            for (i = 0; i < startposindex.length - 1; i++) {
                var x1 = coords[startposindex[i] - 1].x1 + screen_width - screen_width/8 - linewidth*3; // Adding screen_width - screen_width/9 - linewidth*3 displaces figure horizontally
                var x2 = coords[startposindex[i] - 1].x2 + screen_width - screen_width/8 - linewidth*3;
                var y1 = coords[startposindex[i] - 1].y1 + ymid - 1.5*linewidth; // Adding ymid - 1.5*linewidth displaces figure vertically
                var y2 = coords[startposindex[i] - 1].y2 + ymid - 1.5*linewidth;

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

            }

            break;

        case "diff":
            
            // Do not use first element of startposindex when different
            for (i = 1; i < startposindex.length; i++) {
                var x1 = coords[startposindex[i] - 1].x1 + screen_width - screen_width/8 - linewidth*3; // Adding screen_width - screen_width/9 - linewidth*3 displaces figure horizontally
                var x2 = coords[startposindex[i] - 1].x2 + screen_width - screen_width/8 - linewidth*3;
                var y1 = coords[startposindex[i] - 1].y1 + ymid - 1.5*linewidth; // Adding ymid - 1.5*linewidth displaces figure vertically
                var y2 = coords[startposindex[i] - 1].y2 + ymid - 1.5*linewidth;

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

            }

            break;
    };
};

// Function to create block trials
function createBlock(setsize, block_var_list, taskName) {
    var trialVar = eval(taskName + "_trial"); // Get actual trial object

    var block_trials = {
        timeline: [trialVar], // Use the variable, not a string
        timeline_variables: block_var_list
    };

    var block_instructionsVar = eval(taskName + "_block_instructions"); // Get correct instructions
    
    var block = {
        timeline: [block_instructionsVar, block_trials],
        timeline_variables: [{ setsize: setsize }]
    };

    return block;
}



///////////////////////////////// PART 2: Set-up nodes //////////////////////////////////
// 		1. enter_fullscreen
//		2. get_subject_id: Get subject ID
//		3. get_location: Determine whether task is being run through platform or through local files

var enter_fullscreen = {
	type: jsPsychFullscreen,
	fullscreen_mode: true
};

var exit_fullscreen = {
	type: jsPsychFullscreen,
	fullscreen_mode: false,
    on_finish: function() {
        jsPsych.endExperiment()
    }
};

var get_subject_id = {
    type: jsPsychSurveyText,
    questions: [{
        prompt: "Enter participant ID:", 
        required: true,
        name: "participant_id"
    }],
    on_finish: function(data) {
        jsPsych.data.addProperties({
            participant_id: data.response.participant_id
        });

        subject = data.response.participant_id;
    }
};

var get_location = {
	type: jsPsychSurveyMultiChoice,
	questions: [
		{
			prompt: "Where are you running the task?",
			name: "client",
			options: ["Online (cognition.run, gorilla.sc, MTurk link)", "Local (Lab computer files)"],
			required: true

		}],
	on_finish: function(data) {
		online = data.response.client == "Online (cognition.run, gorilla.sc, MTurk link)" ? 1 : 0;
	}
};

var welcome = {
	type: jsPsychHtmlButtonResponse,
	stimulus: "<p><b>Comparison Tasks</b></p>" +
              "<p>Press START to read the instructions.</p>",
	choices: ["START"]
};


/////////////////// Sub-task 1: Digit Comparison /////////////////////////////////
// Incoming Transmission (last for 3 secs)
var digit_instructions_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="intro-section" class="fade-in">
            <p><b>🚨 Incoming Transmission 🚨</b></p>
            <p>Welcome, Operative. The system is under siege.</p>
            <p>Your mission: Inspect encrypted data streams and detect anomalies.</p>
        </div>
    `,
    choices: "NO_KEYS", 
    trial_duration: 3500,
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("intro-section");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #intro-section not found!");
            }
        }, 10); // Small delay to ensure DOM is ready
    },
    on_start: function() {
        resetScoreBar();  // Reset the score bar at the start of the digit comparison task
    }
};

// Identification Protocol
var digit_instructions_2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="protocol-section"  class="fade-in">
            <p>Each sequence contains two sets of <b>numbers</b>.</p>
            <p>If the sequences are an exact match, the code is <span style="color:green">AUTHENTIC</span>.</p>
            <p>If they differ, the code has been <span style="color:red">TAMPERED</span> with.</p><br>
        
            <p>🔹 Press <span style="color:green"><b>F</b></span> to confirm authenticity.</p>
            <p>🔹 Press <span style="color:red"><b>J</b></span> to reject compromised data.</p> <br>
        
            <p>Stay sharp. Stay fast. The firewall won't hold forever.</p><br><br>

            <p style="color: gray; font-size: 14px;">Press SPACE BAR to continue</p>
        </div>
    `,
    choices: [' '], // Space bar to continue
    post_trial_gap: 500,
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("protocol-section");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #protocol-section not found!");
            }
        }, 10); // Small delay to ensure DOM is ready
    }
};

var digit_practice_same = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus(591, 591),
    choices: ['f'],
    prompt: `<br><br><p>These ARE exactly the same, so press <span style="color:green"><b>F</b></span> for YES.</p>`,
    on_finish: function(data) {
        if (data.response === 'f') {
            playSound('correct'); // Play correct sound if answer is correct
        } else {
            playSound('wrong'); // Play wrong sound if incorrect
        }
    }
};

var digit_practice_diff = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus(624, 614),
    choices: ['j'],
    prompt: `<br><br><p>These are NOT the same, so press <span style="color:red"><b>J</b></span> for NO.</p>`,
    on_finish: function(data) {
        if (data.response === 'j') {
            playSound('correct'); // Play correct sound if answer is correct
        } else {
            playSound('wrong'); // Play wrong sound if incorrect
        }
    }
};


// instructions before experimental trials
var digit_instructions_3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div id="protocol-section"  class="fade-in">
        <p>If the numbers are an exact match, hit <span style="color:green"><b>F</b></span>.<br>
        If the numbers don't match, hit <span style="color:red"><b>J</b></span>.</p>

        <p>Keep your fingers ready. The clock is ticking.<br>
        No second chances. No room for hesitation.</p><br><br>

        <p style="color: gray; font-size: 14px;">Press SPACE BAR to continue</p>
        <br><br>
    </div>
    `,
    choices: [' '], 
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("protocol-section");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #protocol-section not found!");
            }
        }, 10); // Small delay to ensure DOM is ready
    }
};

var digit_block_instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() { 
        return `
        <div id="transition" class="fade-in">
            <p>Decrypting next set of digit codes...</p><br>
            <p>There will be ${jsPsych.timelineVariable('setsize')} digits in each set.</p><br><br>
        </div>
        `;
    },
    choices: "NO_KEYS",  // No user input required
    trial_duration: 3000,  // Auto-advance after 3 seconds
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("transition");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #transition not found!");
            }
        }, 10); // Small delay to ensure DOM is ready
    },
    on_start: function() {
        clearTimeout(end_timer);
        timeout = 0;  
        playSound('level-up'); // Play level-up sound on block transition
    }
};

var digit_trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: function() {return createStimulus(jsPsych.timelineVariable('num1'), jsPsych.timelineVariable('num2'))},
	choices: ['f', 'j'],
    on_start: function(data) {
        // Sample one more than the set size. Extra is used when patterns are different
        var diff = jsPsych.timelineVariable('diff')
        condition = diff == 1 ? "diff" : "same";
        correct_response = diff == 1 ? "j" : "f";
        
        block_trial_count++
        if (block_trial_count == 1) {
            end_timer = setTimeout(function() {

                block_trial_count = 0;
                timeout = 1;

                // console.log("Block timed out at this trial", block_trial_count, timeout); // Here to debug
                        
                // this function is all you need to end the current timeline
                jsPsych.endCurrentTimeline();
                
            }, block_time_limit);
        }
        // console.log(condition, correct_response, block_trial_count)
        if (!experimentStarted) {
            experimentStarted = true;  // Mark when the real trials start
            total_correct = 0;  // Reset accuracy tracking
            total_trials = 0;
        }
    },
    on_finish: function(data) {
        data.block_trial_index = block_trial_count;
        data.accuracy = data.response == correct_response ? 1 : 0;
        data.num1 = jsPsych.timelineVariable('num1');
        data.num2 = jsPsych.timelineVariable('num2');
        data.setsize = jsPsych.timelineVariable('setsize');
        data.condition = condition;
        data.correct_response = correct_response;
        data.timeout = timeout; // Indicate whether the block timed out on that trial

        total_trials ++;

        // Play correct or wrong sound
        if (data.accuracy === 1) {
            playSound('correct');
            total_correct ++;
        } else {
            playSound('wrong');
        }

        updateScoreBar();
        console.log(`🔍 Total Trials: ${total_trials}, Correct Responses: ${total_correct}`);

        if (block_trial_count == n_trials) {
            // reset block trial count after person gets through all the trials
            block_trial_count = 0;
            clearTimeout(end_timer);

            // console.log(block_trial_count); // Here to debug
        }

        // console.log(data); // Here to debug
    }
};

var digit_block_3_1 = createBlock(3, digit_list_3_1, "digit");
var digit_block_3_2 = createBlock(3, digit_list_3_2, "digit");
var digit_block_6_1 = createBlock(6, digit_list_6_1, "digit");
var digit_block_6_2 = createBlock(6, digit_list_6_2, "digit");
var digit_block_9_1 = createBlock(9, digit_list_9_1, "digit");
var digit_block_9_2 = createBlock(9, digit_list_9_2, "digit");

// conclusion page
var digit_conclusion = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="conclusion-screen" class="fade-in">
            <p><b>SECTOR 1: DIGIT ANALYSIS COMPLETE ✅</b></p>
            <p>Operative, you've successfully decrypted the numeric sequences.</p>
            <p>The mission continues. Prepare for the next phase.</p>
        </div>
    `,
    post_trial_gap: 2000,
    trial_duration: 3000,  // Automatically proceed after 3 seconds
    on_load: function() {
        setTimeout(() => {
            const transitionElement = document.getElementById("conclusion-screen");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; 
            }
        }, 10);
    },
    on_start: function() {
        playSound('success'); // Play success sound on conclusion screen
        if (online == 0) {
            var filename = "data_digit-comparison_" + subject + ".csv";
            jsPsych.data.get().localSave('csv', filename);
        }
    }
};

/////////////////// Sub-task 2: Letter Comparison /////////////////////////////////
var letter_instructions_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="intro-section" class="fade-in">
            <p>🚨 The system has also detected anomalies in <b>text-based</b> encryption. 🚨</p>
            <p>Your mission: Analyze intercepted letter sequences and identify compromised data.</p>
        </div>
    `,
    choices: "NO_KEYS", 
    trial_duration: 3500,
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("intro-section");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #intro-section not found!");
            }
        }, 10);
    },
    on_start: function() {
        resetScoreBar();  // Reset the score bar at the start of the digit comparison task
    }
};

var letter_practice_same = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus("BHQ", "BHQ"),
    choices: ['f'],
    prompt: `<br><br><p>These ARE exactly the same, so press <span style="color:green"><b>F</b></span> for YES.</p>`,
    on_finish: function(data) {
        if (data.response === 'f') {
            playSound('correct'); 
        } else {
            playSound('wrong');
        }
    }
}

var letter_practice_diff = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus("CVN", "CRN"),
    choices: ['j'],
    prompt: `<br><br><p>These are NOT the same, so press <span style="color:red"><b>J</b></span> for NO.</p>`,
    on_finish: function(data) {
        if (data.response === 'j') {
            playSound('correct');
        } else {
            playSound('wrong');
        }
    }
};

// instructions before experimental trials
var letter_instructions_2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="protocol-section" class="fade-in">
            <p>Each data stream contains two encrypted letter sequences.</p>
            <p>If the sequences are an exact match, the code is <span style="color:green">AUTHENTIC</span>.</p>
            <p>If they differ, the code has been <span style="color:red">TAMPERED</span> with.</p><br>

            <p>🔹 Press <span style="color:green"><b>F</b></span> to confirm authenticity.</p>
            <p>🔹 Press <span style="color:red"><b>J</b></span> to reject compromised data.</p> <br>

            <p>Stay sharp. Stay fast. The firewall won't hold forever.</p><br><br>

            <p style="color: gray; font-size: 14px;">Press SPACE BAR to continue</p>
        <br><br>
        </div>
    `,
    choices: [' '], 
    trial_duration: 6000, // Auto-continue after 6 seconds
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("protocol-section");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #protocol-section not found!");
            }
        }, 10); // Small delay to ensure DOM is ready
    }
};


var letter_block_instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() { 
        return `
        <div id="transition" class="fade-in">
            <p>Decrypting next set of letter codes...</p><br>
            <p>There will be ${jsPsych.timelineVariable('setsize')} letters in each set.</p><br><br>
        </div>
        `;
    },
    choices: "NO_KEYS", // No button press required
    trial_duration: 3000, // Auto-continue after 3 seconds
    on_load: function() { 
        setTimeout(() => {
            const transitionElement = document.getElementById("transition");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; 
            } else {
                console.warn("Element #transition not found!");
            }
        }, 10);
    },
    on_start: function() {
        clearTimeout(end_timer);
        timeout = 0;  
        playSound('level-up'); // Play sound on block transition
    }
};

var letter_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        return createStimulus(jsPsych.timelineVariable('str1'), jsPsych.timelineVariable('str2'));
    },
    choices: ['f', 'j'],
    on_start: function(data) {
        correct_response = jsPsych.timelineVariable('cond') == "diff" ? "j" : "f";
        
        block_trial_count++;
        if (block_trial_count == 1) {
            end_timer = setTimeout(function() {
                block_trial_count = 0;
                timeout = 1;

                jsPsych.endCurrentTimeline(); // Ends current timeline if time runs out
                
            }, block_time_limit);
        }
    },
    on_finish: function(data) {
        data.block_trial_index = block_trial_count;
        data.accuracy = data.response == correct_response ? 1 : 0;
        data.str1 = jsPsych.timelineVariable('str1');
        data.str2 = jsPsych.timelineVariable('str2');
        data.setsize = jsPsych.timelineVariable('setsize');
        data.condition = jsPsych.timelineVariable('cond');
        data.correct_response = correct_response;
        data.timeout = timeout; // Indicate whether the block timed out on that trial

        total_trials ++;

        // Play sound effect based on correctness
        if (!data.timeout) {  // Ensure sound is not played when timing out
            if (data.response === correct_response) {
                playSound('correct'); // Play correct sound
                total_correct ++;
            } else {
                playSound('wrong');   // Play wrong sound
            }
        }

        updateScoreBar();

        if (block_trial_count == n_trials) {
            // Reset block trial count after all trials are completed
            block_trial_count = 0;
            clearTimeout(end_timer);
        }
    }
};


var letter_block_3_1 = createBlock(3, letter_list_3_1, "letter");
var letter_block_3_2 = createBlock(3, letter_list_3_2, "letter");
var letter_block_6_1 = createBlock(6, letter_list_6_1, "letter");
var letter_block_6_2 = createBlock(6, letter_list_6_2, "letter");
var letter_block_9_1 = createBlock(9, letter_list_9_1, "letter");
var letter_block_9_2 = createBlock(9, letter_list_9_2, "letter");

// conclusion page
var letter_conclusion = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="conclusion-screen" class="fade-in">
            <p><b>SECTOR 2: LETTER ANALYSIS COMPLETE ✅</b></p>
            <p>Well done, Operative. The letter sequences have been processed.</p>
            <p>Prepare for the next challenge.</p>
        </div>
    `,
    post_trial_gap: 2000,
    trial_duration: 3000,  // Automatically proceed after 3 seconds
    on_load: function() {
        setTimeout(() => {
            const transitionElement = document.getElementById("conclusion-screen");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; 
            }
        }, 10);
    },
    on_start: function() {
        playSound('success');
        if (online == 0) {
            var filename = "data_letter-comparison_" + subject + ".csv";
            jsPsych.data.get().localSave('csv', filename);
        }
    }
};

/////////////////// Sub-task 3: Pattern Comparison /////////////////////////////////
var pattern_instructions_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="intro-section" class="fade-in">
            <p>🚨 The system has also detected anomalies in <b>pattern-based</b> encryption. 🚨</p>
            <p>Your mission: Analyze encoded pattern sequences and identify potential breaches.</p>
        </div>
    `,
    choices: "NO_KEYS", 
    trial_duration: 3500,
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("intro-section");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #intro-section not found!");
            }
        }, 10);
    },
    on_start: function() {
        resetScoreBar();  // Reset the score bar at the start of the digit comparison task
    }
};

var pattern_practice_same = {
    type: jsPsychCanvasKeyboardResponse,
    stimulus: drawPatterns,
    canvas_size: [screen_height, screen_width],
    choices: ['f'],
    prompt: `<p>These ARE exactly the same, so press <span style="color:green"><b>F</b></span> for YES.</p>`,
    on_start: function() {
        startposindex = [8, 12, 17, 1],
        condition = "same"
    },
    on_finish: function(data) {
        if (data.response === 'f') {
            playSound('correct'); 
        } else {
            playSound('wrong'); 
        }
    }
}

var pattern_practice_diff = {
    type: jsPsychCanvasKeyboardResponse,
    stimulus: drawPatterns,
    canvas_size: [screen_height, screen_width],
    choices: ['j'],
    prompt: `<p>These are NOT the same, so press <span style="color:red"><b>J</b></span> for NO.</p>`,
    on_start: function() {
        startposindex = [18, 10, 17, 11],
        condition = "diff"
    },
    on_finish: function(data) {
        if (data.response === 'j') {
            playSound('correct'); 
        } else {
            playSound('wrong'); 
        }
    }
};

// instructions before experimental trials
var pattern_instructions_2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="protocol-section" class="fade-in">
            <p>Each data stream contains two encrypted pattern sequences.</p>
            <p>If the sequences are an exact match, the code is <span style="color:green">AUTHENTIC</span>.</p>
            <p>If they differ, the code has been <span style="color:red">TAMPERED</span> with.</p><br>

            <p>🔹 Press <span style="color:green"><b>F</b></span> to confirm authenticity.</p>
            <p>🔹 Press <span style="color:red"><b>J</b></span> to reject compromised data.</p> <br>

            <p>Stay sharp. Stay fast. The firewall won't hold forever.</p><br><br>

            <p style="color: gray; font-size: 14px;">Press SPACE BAR to continue</p>
        </div>
    `,
    choices: [' '], 
    trial_duration: 4000, // Auto-continue after 4 seconds
    on_load: function() { // Ensure animation is applied after rendering
        setTimeout(() => {
            const transitionElement = document.getElementById("protocol-section");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; // Smooth fade-in
            } else {
                console.warn("Element #protocol-section not found!");
            }
        }, 10); // Small delay to ensure DOM is ready
    }
};


var pattern_block_instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() { 
        return `
        <div id="transition" class="fade-in">
            <p>Decrypting next set of pattern codes...</p><br>
            <p>There will be ${jsPsych.timelineVariable('setsize')} lines in each pattern.</p><br><br>
        </div>
        `;
    },
    choices: "NO_KEYS", // No button press required
    trial_duration: 3000, // Auto-continue after 3 seconds
    on_load: function() { 
        setTimeout(() => {
            const transitionElement = document.getElementById("transition");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; 
            } else {
                console.warn("Element #transition not found!");
            }
        }, 10);
    },
    on_start: function() {
        clearTimeout(end_timer);
        timeout = 0;  
        playSound('level-up'); // Play sound on block transition
    }
};

var pattern_trial = {
    type: jsPsychCanvasKeyboardResponse,
    stimulus: drawPatterns,
    canvas_size: [screen_height, screen_width],
    choices: ['f', 'j'], // ONLY allow 'f' and 'j' as valid responses
    on_start: function() {
        startposindex = jsPsych.timelineVariable('posindex');
        var diff = jsPsych.timelineVariable('diff');
        condition = diff == 1 ? "diff" : "same";
        correct_response = jsPsych.timelineVariable('cr');

        block_trial_count++;
        if (block_trial_count == 1) {
            end_timer = setTimeout(function() {
                block_trial_count = 0;
                timeout = 1;
                jsPsych.endCurrentTimeline();
            }, block_time_limit);
        }
    },
    on_finish: function(data) {
        data.block_trial_index = block_trial_count;
        data.accuracy = (data.response === correct_response) ? 1 : 0;
        data.pattern = jsPsych.timelineVariable('posindex');
        data.setsize = jsPsych.timelineVariable('setsize');
        data.condition = condition;
        data.correct_response = correct_response;
        data.timeout = timeout; 

        total_trials++;

        if (data.response === correct_response) {
            playSound('correct');
            total_correct++;
        } else {
            playSound('wrong');
        }

        updateScoreBar();

        if (block_trial_count == n_trials) {
            block_trial_count = 0;
            clearTimeout(end_timer);
        }
    }
};



var pattern_block_3_1 = createBlock(3, pattern_list_3_1, "pattern");
var pattern_block_3_2 = createBlock(3, pattern_list_3_2, "pattern");
var pattern_block_6_1 = createBlock(6, pattern_list_6_1, "pattern");
var pattern_block_6_2 = createBlock(6, pattern_list_6_2, "pattern");
var pattern_block_9_1 = createBlock(9, pattern_list_9_1, "pattern");
var pattern_block_9_2 = createBlock(9, pattern_list_9_2, "pattern");

// conclusion page
var pattern_conclusion = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="conclusion-screen"  class="fade-in">
            <p><b>ALL MISSION ACCOMPLISHED ✅</b></p>
            <p>Operative, your decryption skills are unmatched.</p>
            <p>The system is secure for now!</p><br><br>
            <p style="color: gray; font-size: 14px;"><b>Press ANY KEY to exit</b></p>
        </div>
    `,
    post_trial_gap: 2000,
    on_load: function() {
        setTimeout(() => {
            const transitionElement = document.getElementById("conclusion-screen");
            if (transitionElement) {
                transitionElement.style.opacity = "1"; 
            }
        }, 10);
    },
	on_start: function() {
        playSound('success'); // Play success sound on conclusion screen
		if (online == 0) {
			var filename = "data_pattern-comparison_" + subject + ".csv";
			jsPsych.data.get().localSave('csv', filename);
		}
	},
    on_finish: function() {
        jsPsych.endExperiment()
    }
};


////////////////////// PART 3: PUT TIMELINE TOGETHER ///////////////////////////////

var digit_timeline = [
    digit_instructions_1, digit_instructions_2, digit_practice_same, digit_practice_diff, digit_instructions_3,
    digit_block_3_1, // digit_block_6_1, 
    // digit_block_9_1, digit_block_3_2, digit_block_6_2, digit_block_9_2,
    digit_conclusion
];

var letter_timeline = [
    letter_instructions_1, letter_practice_same, letter_practice_diff, letter_instructions_2,
    letter_block_3_1, // letter_block_6_1, 
    // letter_block_9_1, letter_block_3_2, letter_block_6_2, letter_block_9_2,
    letter_conclusion
];

var pattern_timeline = [
    pattern_instructions_1, pattern_practice_same, pattern_practice_diff, pattern_instructions_2,
    pattern_block_3_1, // pattern_block_6_1, 
    // pattern_block_9_1, pattern_block_3_2, pattern_block_6_2, pattern_block_9_2,
    pattern_conclusion
];

var timeline = [
    get_subject_id, // get_location,
    welcome, enter_fullscreen,
    ...digit_timeline,
    ...letter_timeline,
    ...pattern_timeline,
    exit_fullscreen
];

// Run experiment
jsPsych.run(timeline);