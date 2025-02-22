// DIGIT COMPARISON TASK //

/////////////////// PART 1: Initialize jsPsych, functions, and variables /////////////////////////////////
// This initialization should happen before the rest of the jsPsych code is called
var jsPsych = initJsPsych({});

// Initialize general variables
// IMPORTANT: THESE ARE THE ONLY VARIABLES THAT SHOULD BE MANUALLY CHANGED, the rest should be adaptive
const screen_width = 1024;
const screen_height = 768;
const linewidth = Math.min(screen_width/10, screen_height/10);
var ymid = screen_height/2;
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

// Hardcode order of conditions to ensure that subjects still get an equal distribution of same and different even if they only get to beginning trials
var list_3_1 = [{ str1: 'DSY', str2: 'DSY', cond: 'same' }, { str1: 'JTF', str2: 'JTF', cond: 'same' }, { str1: 'WHQ', str2: 'WZQ', cond: 'diff' }, { str1: 'THQ', str2: 'THQ', cond: 'same' }, { str1: 'TVD', str2: 'TVD', cond: 'same' }, { str1: 'GJJ', str2: 'RJJ', cond: 'diff' }, { str1: 'KNY', str2: 'KCY', cond: 'diff' }, { str1: 'HVS', str2: 'HVS', cond: 'same' }, { str1: 'JCH', str2: 'JCH', cond: 'same' }, { str1: 'PJG', str2: 'ZJG', cond: 'diff' }, { str1: 'MBQ', str2: 'WBQ', cond: 'diff' }, { str1: 'WXN', str2: 'WXN', cond: 'same' }, { str1: 'PNG', str2: 'KNG', cond: 'diff' }, { str1: 'YPD', str2: 'YPD', cond: 'same' }, { str1: 'VBF', str2: 'VDF', cond: 'diff' }, { str1: 'HDK', str2: 'SDK', cond: 'diff' }, { str1: 'JTZ', str2: 'JTX', cond: 'diff' }, { str1: 'MYP', str2: 'MJP', cond: 'diff' }, { str1: 'ZYK', str2: 'ZYK', cond: 'same' }, { str1: 'XDS', str2: 'XCS', cond: 'diff' }, { str1: 'QXB', str2: 'YXB', cond: 'diff' }, { str1: 'STS', str2: 'STS', cond: 'same' }, { str1: 'HPC', str2: 'HPC', cond: 'same' }, { str1: 'YNM', str2: 'YNJ', cond: 'diff' }, { str1: 'TNR', str2: 'TNR', cond: 'same' }, { str1: 'ZZW', str2: 'ZZW', cond: 'same' }, { str1: 'DQN', str2: 'DFN', cond: 'diff' }, { str1: 'CZL', str2: 'NZL', cond: 'diff' }, { str1: 'VCM', str2: 'VCV', cond: 'diff' }, { str1: 'BLV', str2: 'BLV', cond: 'same' }, { str1: 'PHC', str2: 'PHC', cond: 'same' }, { str1: 'PPK', str2: 'PPK', cond: 'same' }];
var list_3_2 = [{ str1: 'KPB', str2: 'KPS', cond: 'diff' }, { str1: 'JCB', str2: 'JLB', cond: 'diff' }, { str1: 'NGL', str2: 'NGL', cond: 'same' }, { str1: 'RHM', str2: 'RHM', cond: 'same' }, { str1: 'WBY', str2: 'WBN', cond: 'diff' }, { str1: 'QCX', str2: 'QCX', cond: 'same' }, { str1: 'MXP', str2: 'MYP', cond: 'diff' }, { str1: 'KHN', str2: 'KHN', cond: 'same' }, { str1: 'ZCM', str2: 'TCM', cond: 'diff' }, { str1: 'GFP', str2: 'GFP', cond: 'same' }, { str1: 'HHV', str2: 'HKV', cond: 'diff' }, { str1: 'WGW', str2: 'WGW', cond: 'same' }, { str1: 'XPW', str2: 'XXW', cond: 'diff' }, { str1: 'GJX', str2: 'GJL', cond: 'diff' }, { str1: 'HDY', str2: 'HDY', cond: 'same' }, { str1: 'FLQ', str2: 'FLQ', cond: 'same' }, { str1: 'MPM', str2: 'MPM', cond: 'same' }, { str1: 'DHS', str2: 'DHP', cond: 'diff' }, { str1: 'GHW', str2: 'GHW', cond: 'same' }, { str1: 'TQN', str2: 'TQN', cond: 'same' }, { str1: 'XCV', str2: 'XKV', cond: 'diff' }, { str1: 'GSP', str2: 'GSP', cond: 'same' }, { str1: 'PWF', str2: 'QWF', cond: 'diff' }, { str1: 'TTP', str2: 'TTP', cond: 'same' }, { str1: 'GZT', str2: 'GZM', cond: 'diff' }, { str1: 'DKV', str2: 'PKV', cond: 'diff' }, { str1: 'JRL', str2: 'JRC', cond: 'diff' }, { str1: 'ZCQ', str2: 'ZCR', cond: 'diff' }, { str1: 'YHN', str2: 'YHQ', cond: 'diff' }, { str1: 'TCV', str2: 'TCV', cond: 'same' }, { str1: 'ZBW', str2: 'ZBW', cond: 'same' }, { str1: 'LZJ', str2: 'LZJ', cond: 'same' }];
var list_6_1 = [{ str1: 'NQJDBB', str2: 'NQJDHB', cond: 'diff' }, { str1: 'BVDTMC', str2: 'BVDTMC', cond: 'same' }, { str1: 'VKYJTJ', str2: 'VKYJTJ', cond: 'same' }, { str1: 'XSYWVH', str2: 'XFYWVH', cond: 'diff' }, { str1: 'TCZFKK', str2: 'TCZFKK', cond: 'same' }, { str1: 'QYNDSR', str2: 'QYNDSR', cond: 'same' }, { str1: 'ZYGVDV', str2: 'ZJGVDV', cond: 'diff' }, { str1: 'MGVWXL', str2: 'MGVWPL', cond: 'diff' }, { str1: 'GYWFKG', str2: 'GDWFKG', cond: 'diff' }, { str1: 'MDCDTK', str2: 'MDCDTK', cond: 'same' }, { str1: 'ZNSWPY', str2: 'ZNSWPY', cond: 'same' }, { str1: 'QSPHXH', str2: 'QSPHXH', cond: 'same' }, { str1: 'GBWTMJ', str2: 'GBWTMN', cond: 'diff' }, { str1: 'GWLGGN', str2: 'TWLGGN', cond: 'diff' }, { str1: 'RRSYKS', str2: 'RRSVKS', cond: 'diff' }, { str1: 'LFDPPV', str2: 'LFDPPV', cond: 'same' }, { str1: 'FSMYQY', str2: 'FSMYJY', cond: 'diff' }, { str1: 'NSHMBB', str2: 'NSHMXB', cond: 'diff' }, { str1: 'SBSSYP', str2: 'SBSSYP', cond: 'same' }, { str1: 'FYVPWH', str2: 'WYVPWH', cond: 'diff' }, { str1: 'KBSXGS', str2: 'KBSXQS', cond: 'diff' }, { str1: 'WTJKYQ', str2: 'WTJKYQ', cond: 'same' }, { str1: 'GXPLTJ', str2: 'GXPLTJ', cond: 'same' }, { str1: 'RKJRND', str2: 'RKJRND', cond: 'same' }, { str1: 'HDYGKW', str2: 'PDYGKW', cond: 'diff' }, { str1: 'FTKSHW', str2: 'FTKDHW', cond: 'diff' }, { str1: 'RXSXQF', str2: 'RXSXQT', cond: 'diff' }, { str1: 'BNBRQJ', str2: 'BNBRQJ', cond: 'same' }, { str1: 'XZMJBS', str2: 'XZMJBS', cond: 'same' }, { str1: 'CMGHTY', str2: 'CNGHTY', cond: 'diff' }, { str1: 'KJGCNV', str2: 'KJGCNV', cond: 'same' }, { str1: 'BPKDGK', str2: 'BPKDGK', cond: 'same' }];
var list_6_2 = [{ str1: 'HWTFHW', str2: 'HWTFHK', cond: 'diff' }, { str1: 'YMXGYS', str2: 'SMXGYS', cond: 'diff' }, { str1: 'RFDZZJ', str2: 'RFDMZJ', cond: 'diff' }, { str1: 'LBHYDR', str2: 'LBHYDR', cond: 'same' }, { str1: 'MZTLMP', str2: 'NZTLMP', cond: 'diff' }, { str1: 'VFFPRW', str2: 'VFFPRW', cond: 'same' }, { str1: 'MKCKRZ', str2: 'MKCKRZ', cond: 'same' }, { str1: 'RGQPSM', str2: 'RGQPSM', cond: 'same' }, { str1: 'CWJNWM', str2: 'CWJNWM', cond: 'same' }, { str1: 'KDYFSK', str2: 'KDYFSK', cond: 'same' }, { str1: 'MXVTXF', str2: 'MXVDXF', cond: 'diff' }, { str1: 'FJLPQG', str2: 'FJLPQG', cond: 'same' }, { str1: 'LPPLQS', str2: 'LPPLQT', cond: 'diff' }, { str1: 'LCTPQH', str2: 'LCTPQH', cond: 'same' }, { str1: 'VGBXZZ', str2: 'VGXXZZ', cond: 'diff' }, { str1: 'RLRGRJ', str2: 'RLMGRJ', cond: 'diff' }, { str1: 'RLTSKX', str2: 'RLNSKX', cond: 'diff' }, { str1: 'TFRRWM', str2: 'TKRRWM', cond: 'diff' }, { str1: 'VYYLZC', str2: 'VYYLZQ', cond: 'diff' }, { str1: 'NTQNTS', str2: 'MTQNTS', cond: 'diff' }, { str1: 'DCMBRR', str2: 'RCMBRR', cond: 'diff' }, { str1: 'WYDCPB', str2: 'WYDCPB', cond: 'same' }, { str1: 'PYVGXM', str2: 'PYVGXM', cond: 'same' }, { str1: 'JKDJKV', str2: 'JKDJKV', cond: 'same' }, { str1: 'STCBTZ', str2: 'STCBTZ', cond: 'same' }, { str1: 'DQPKYX', str2: 'DQPKRX', cond: 'diff' }, { str1: 'LMGTPV', str2: 'LMGTPV', cond: 'same' }, { str1: 'VDSYTN', str2: 'VDLYTN', cond: 'diff' }, { str1: 'ZPKDQN', str2: 'ZPKDQN', cond: 'same' }, { str1: 'BYTVVV', str2: 'BYTVVV', cond: 'same' }, { str1: 'DMQJFH', str2: 'DMQJVH', cond: 'diff' }, { str1: 'KKFCYJ', str2: 'KKFCYJ', cond: 'same' }];
var list_9_1 = [{ str1: 'NPFTYJLBB', str2: 'NPFTYJLBQ', cond: 'diff' }, { str1: 'GPYMBKLSL', str2: 'GPYMBKLSL', cond: 'same' }, { str1: 'JJWBHGSHH', str2: 'JJWBJGSHH', cond: 'diff' }, { str1: 'PLLBPZKYK', str2: 'PLLBPZKYK', cond: 'same' }, { str1: 'DYCNSFXWR', str2: 'DYCNSFXWD', cond: 'diff' }, { str1: 'RCMQHKGZS', str2: 'RCMGHKGZS', cond: 'diff' }, { str1: 'XHFMLVNNP', str2: 'XHFMLVNNP', cond: 'same' }, { str1: 'RVYXTDPLM', str2: 'RVYXTDPLM', cond: 'same' }, { str1: 'SFQPTTNXK', str2: 'SFQPTTNXK', cond: 'same' }, { str1: 'GCHLMFJYH', str2: 'PCHLMFJYH', cond: 'diff' }, { str1: 'BNWCJZXJD', str2: 'BNWCJZXJD', cond: 'same' }, { str1: 'XKGHMRLDC', str2: 'XCGHMRLDC', cond: 'diff' }, { str1: 'SHDNKMXXF', str2: 'SHDNHMXXF', cond: 'diff' }, { str1: 'WRMNNTJBS', str2: 'DRMNNTJBS', cond: 'diff' }, { str1: 'VSMPBYFKS', str2: 'VSMPBYFKS', cond: 'same' }, { str1: 'ZTLHRYLWX', str2: 'ZTLHRYLWX', cond: 'same' }, { str1: 'KVKBWMKVL', str2: 'KVKBWMKVL', cond: 'same' }, { str1: 'YFLHKPSLS', str2: 'YFLRKPSLS', cond: 'diff' }, { str1: 'FVTCCJQSZ', str2: 'FVTCCJQSZ', cond: 'same' }, { str1: 'ZMMGGKPXN', str2: 'ZMMGGKPXN', cond: 'same' }, { str1: 'QMGLXRDHZ', str2: 'QMJLXRDHZ', cond: 'diff' }, { str1: 'SHDZMMZZM', str2: 'SHDZMCZZM', cond: 'diff' }, { str1: 'QQQCZKBBG', str2: 'QQQCZHBBG', cond: 'diff' }, { str1: 'DGGLYSYGS', str2: 'JGGLYSYGS', cond: 'diff' }, { str1: 'BBPFRXNJT', str2: 'BBPFRXNJT', cond: 'same' }, { str1: 'DSXJDPJTP', str2: 'DSXJDPJTP', cond: 'same' }, { str1: 'JNCXYNJHY', str2: 'JNCXYNJHX', cond: 'diff' }, { str1: 'BRSCBJHMZ', str2: 'BRSCBJHMZ', cond: 'same' }, { str1: 'BNJVWLWRF', str2: 'BNCVWLWRF', cond: 'diff' }, { str1: 'NPDNFQBBK', str2: 'RPDNFQBBK', cond: 'diff' }, { str1: 'HWCQWWSTV', str2: 'HWCQWWSTV', cond: 'same' }, { str1: 'YVCWTYRZL', str2: 'YVCWTYRZL', cond: 'same' }];
var list_9_2 = [{ str1: 'GWQSGGLHK', str2: 'GWQSGGLHK', cond: 'same' }, { str1: 'SBLDMVRFM', str2: 'SBLDMVRFW', cond: 'diff' }, { str1: 'SPFLQYVCB', str2: 'SPFLQYVCB', cond: 'same' }, { str1: 'HNSHSKQYW', str2: 'HNSHSKQYW', cond: 'same' }, { str1: 'RFXFPYNKW', str2: 'RFXFSYNKW', cond: 'diff' }, { str1: 'GPZPZPNXV', str2: 'GPZPZRNXV', cond: 'diff' }, { str1: 'KSXNHHBPD', str2: 'KSXNHHBPD', cond: 'same' }, { str1: 'WTSYSQSBB', str2: 'WTJYSQSBB', cond: 'diff' }, { str1: 'KQKBBTHPB', str2: 'KQKBTTHPB', cond: 'diff' }, { str1: 'VHYRDCYRP', str2: 'VHYRDCYRP', cond: 'same' }, { str1: 'JFNVGKFMQ', str2: 'JFNVGKFWQ', cond: 'diff' }, { str1: 'CWTLFRDLL', str2: 'CWTLLRDLL', cond: 'diff' }, { str1: 'DBGMSFTPS', str2: 'DBGMSFTYS', cond: 'diff' }, { str1: 'GJSFQNPJS', str2: 'GJSFQNPJS', cond: 'same' }, { str1: 'KQSYSHGSZ', str2: 'KQSYSHGSZ', cond: 'same' }, { str1: 'LLFFBRTCY', str2: 'LLFFBRTCY', cond: 'same' }, { str1: 'TYPDHSSHH', str2: 'CYPDHSSHH', cond: 'diff' }, { str1: 'FMKJNZKNY', str2: 'FMKJNZKNY', cond: 'same' }, { str1: 'YVCGZNBRK', str2: 'YVCGZNBRK', cond: 'same' }, { str1: 'ZJPMKYWWX', str2: 'ZJTMKYWWX', cond: 'diff' }, { str1: 'BRQNQKHCV', str2: 'BCQNQKHCV', cond: 'diff' }, { str1: 'RGGTZTXRS', str2: 'RGGTZTXNS', cond: 'diff' }, { str1: 'NRNVRKCHK', str2: 'NHNVRKCHK', cond: 'diff' }, { str1: 'XBQBQPSBN', str2: 'XBQBQPSBN', cond: 'same' }, { str1: 'DMRCNNFPT', str2: 'DMRDNNFPT', cond: 'diff' }, { str1: 'NCKHNRLVW', str2: 'NCKHNRLQW', cond: 'diff' }, { str1: 'FRSTSYPVY', str2: 'FRSTSYPVY', cond: 'same' }, { str1: 'QYNGVTJZG', str2: 'QYNGVTJZG', cond: 'same' }, { str1: 'SFGLFJPDR', str2: 'SFFLFJPDR', cond: 'diff' }, { str1: 'GRGTXYCFP', str2: 'GRGTXYCFP', cond: 'same' }, { str1: 'QPSQBSHFQ', str2: 'QPSQBSHFQ', cond: 'same' }, { str1: 'DSXXLCMVB', str2: 'DSXXLCMVB', cond: 'same' }];

// Function to create stimulus on the screen
function createStimulus(str1, str2) {
    return '<p style="font-size:48px; font-family:Courier New">' + str1 + '&emsp;&emsp;&emsp;&emsp;&emsp;' + str2 + '</p>'
}

///////////////////////////////// PART 2: Set-up nodes //////////////////////////////////
// 		1. enter_fullscreen
//		2. get_subject_id: Get subject ID
//		3. get_location: Determine whether task is being run through platform or through local files

var enter_fullscreen = {
	type: jsPsychFullscreen,
	fullscreen_mode: true
}

var exit_fullscreen = {
	type: jsPsychFullscreen,
	fullscreen_mode: false,
    on_finish: function() {
        jsPsych.endExperiment()
    }
}

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
		})

		subject = data.response.participant_id;
	}
}

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
}

// Instructions
var welcome = {
	type: jsPsychHtmlButtonResponse,
	stimulus: "<p><b>Comparing Letters</b></p>" +
              "<p>Press START to read the instructions.</p>",
	choices: ["START"]
}

var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p>In this task, you will see 2 sets of letters on each screen.<br>
      Your job is to judge whether the two sets are the <b>same</b>.</p>
      <p>Press the <b>D</b> key if, yes, the sets <b>ARE</b> exactly the same.<br>
      Press the <b>K</b> key if, no, the sets are <b>NOT</b> exactly the same.</p>
      <p>We'll show you some examples to get you started.</p>
      <p>Click <b>CONTINUE</b> to begin the practice session.</p>
      <br>
      <br>
    `,
  choices: ['CONTINUE'],
  post_trial_gap: 500
};

var practice_same = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus("BHQ", "BHQ"),
    choices: ['d'],
    prompt: `<br><br><p>These ARE exactly the same, so press D for YES.</p>`
}

var practice_diff = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus("CVN", "CRN"),
    choices: ['k'],
    prompt: `<br><br><p>These are NOT the same, so press K for NO.</p>`
};

// instructions before experimental trials
var instructions_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p>Please keep your fingers on the D and K keys so you can respond quickly.<br>
    In each group of trials, there will be a different number of letters per set.<br>
    We know that you might make some mistakes--everyone does! But, please try to go as fast as you can while still being accurate.</p>
    <p><b>REMINDER:</b><br>
    Press the <b>D</b> key if, <b>yes</b>, the letters <b>ARE</b> exactly the same.<br>
    Press the <b>K</b> key if, <b>no</b>, the letters are <b>NOT</b> exactly the same.</p>
    <p>If you have any questions please ask the experimenter now.</p></p>
    <p> Click <b>CONTINUE</b> to begin.</p>
    <br>
    <br>
        `,
  choices: ['CONTINUE']
};

var block_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() { return "<p>In this group of trials, there will be " + jsPsych.timelineVariable('setsize') + " letters in each set.</p><br><br>"},
    choices: ["CONTINUE"],
    on_start: function() {
        clearTimeout(end_timer);
        timeout = 0;

        // console.log(timeout); // Here to debug
    }
}

var trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: function() {return createStimulus(jsPsych.timelineVariable('str1'), jsPsych.timelineVariable('str2'))},
	choices: ['d', 'k'],
    on_start: function(data) {
        correct_response = jsPsych.timelineVariable('cond') == "diff" ? "k" : "d";
        
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

        if (block_trial_count == n_trials) {
            // reset block trial count after person gets through all the trials
            block_trial_count = 0;
            clearTimeout(end_timer);

            // console.log(block_trial_count); // Here to debug
        }

        // console.log(data); // Here to debug
    }
}

function createBlock(setsize, block_var_list) {
    var block_trials = {
        timeline: [trial],
        timeline_variables: block_var_list
    }

    var block = {
        timeline: [block_instructions, block_trials],
        timeline_variables: [{setsize: setsize}]
    }

    return block;
 }

var block_3_1 = createBlock(3, list_3_1);
var block_3_2 = createBlock(3, list_3_2);
var block_6_1 = createBlock(6, list_6_1);
var block_6_2 = createBlock(6, list_6_2);
var block_9_1 = createBlock(9, list_9_1);
var block_9_2 = createBlock(9, list_9_2);

// conclusion page
var conclusion = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p> You are now finished with this task! </p><br>
               <p><b> Press any key to exit.</b></p>
               <div style='width: 700px;'></div>`,
    post_trial_gap: 2000,
	on_start: function() {
		if (online == 0) {
			var filename = "data_letter-comparison_" + subject + ".csv";
			jsPsych.data.get().localSave('csv', filename);
		}
	}
};

////////////////////// PART 3: PUT TIMELINE TOGETHER ///////////////////////////////

var timeline = [
    get_subject_id, // get_location,
    welcome, enter_fullscreen, instructions, practice_same, practice_diff, instructions_2,
    block_3_1, block_6_1, block_9_1, block_3_2, block_6_2, block_9_2,
    conclusion, exit_fullscreen
];

// Run experiment
jsPsych.run(timeline);