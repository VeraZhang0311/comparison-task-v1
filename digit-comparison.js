// DIGIT COMPARISON TASK //

/////////////////// PART 1: Initialize jsPsych, functions, and variables /////////////////////////////////
// This initialization should happen before the rest of the jsPsych code is called
var jsPsych = initJsPsych({});

// Initialize general variables
// IMPORTANT: THESE ARE THE ONLY VARIABLES THAT SHOULD BE MANUALLY CHANGED, the rest should be adaptive
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

// Hardcode order of conditions to ensure that subjects still get an equal distribution of same and different even if they only get to beginning trials
var list_3_1 = [{ num1: 417, num2: 467, diff: 1 }, { num1: 663, num2: 963, diff: 1 }, { num1: 459, num2: 459, diff: 0 }, { num1: 431, num2: 431, diff: 0 }, { num1: 166, num2: 163, diff: 1 }, { num1: 563, num2: 863, diff: 1 }, { num1: 491, num2: 498, diff: 1 }, { num1: 796, num2: 726, diff: 1 }, { num1: 935, num2: 935, diff: 0 }, { num1: 235, num2: 235, diff: 0 }, { num1: 331, num2: 331, diff: 0 }, { num1: 984, num2: 984, diff: 0 }, { num1: 638, num2: 636, diff: 1 }, { num1: 448, num2: 448, diff: 0 }, { num1: 843, num2: 863, diff: 1 }, { num1: 549, num2: 549, diff: 0 }, { num1: 432, num2: 432, diff: 0 }, { num1: 741, num2: 641, diff: 1 }, { num1: 649, num2: 649, diff: 0 }, { num1: 411, num2: 611, diff: 1 }, { num1: 592, num2: 592, diff: 0 }, { num1: 682, num2: 642, diff: 1 }, { num1: 133, num2: 173, diff: 1 }, { num1: 744, num2: 144, diff: 1 }, { num1: 763, num2: 713, diff: 1 }, { num1: 311, num2: 311, diff: 0 }, { num1: 781, num2: 751, diff: 1 }, { num1: 849, num2: 849, diff: 0 }, { num1: 356, num2: 756, diff: 1 }, { num1: 668, num2: 668, diff: 0 }, { num1: 497, num2: 497, diff: 0 }, { num1: 161, num2: 161, diff: 0 }];
var list_3_2 = [{ num1: 841, num2: 841, diff: 0 }, { num1: 219, num2: 219, diff: 0 }, { num1: 256, num2: 296, diff: 1 }, { num1: 788, num2: 758, diff: 1 }, { num1: 182, num2: 189, diff: 1 }, { num1: 734, num2: 434, diff: 1 }, { num1: 618, num2: 618, diff: 0 }, { num1: 219, num2: 219, diff: 0 }, { num1: 687, num2: 687, diff: 0 }, { num1: 352, num2: 352, diff: 0 }, { num1: 259, num2: 259, diff: 0 }, { num1: 891, num2: 898, diff: 1 }, { num1: 455, num2: 452, diff: 1 }, { num1: 229, num2: 229, diff: 0 }, { num1: 642, num2: 622, diff: 1 }, { num1: 993, num2: 593, diff: 1 }, { num1: 346, num2: 316, diff: 1 }, { num1: 986, num2: 986, diff: 0 }, { num1: 392, num2: 392, diff: 0 }, { num1: 337, num2: 337, diff: 0 }, { num1: 973, num2: 973, diff: 0 }, { num1: 192, num2: 142, diff: 1 }, { num1: 528, num2: 528, diff: 0 }, { num1: 634, num2: 634, diff: 0 }, { num1: 744, num2: 744, diff: 0 }, { num1: 521, num2: 121, diff: 1 }, { num1: 528, num2: 558, diff: 1 }, { num1: 579, num2: 576, diff: 1 }, { num1: 814, num2: 819, diff: 1 }, { num1: 813, num2: 813, diff: 0 }, { num1: 883, num2: 983, diff: 1 }, { num1: 925, num2: 985, diff: 1 }];
var list_6_1 = [{ num1: 977229, num2: 971229, diff: 1 }, { num1: 162171, num2: 164171, diff: 1 }, { num1: 255463, num2: 255663, diff: 1 }, { num1: 222317, num2: 222317, diff: 0 }, { num1: 258261, num2: 258267, diff: 1 }, { num1: 229175, num2: 229175, diff: 0 }, { num1: 346611, num2: 346615, diff: 1 }, { num1: 844662, num2: 845662, diff: 1 }, { num1: 741863, num2: 711863, diff: 1 }, { num1: 999728, num2: 999728, diff: 0 }, { num1: 524812, num2: 524812, diff: 0 }, { num1: 775187, num2: 775187, diff: 0 }, { num1: 147113, num2: 147113, diff: 0 }, { num1: 895221, num2: 895221, diff: 0 }, { num1: 527951, num2: 527951, diff: 0 }, { num1: 125359, num2: 125358, diff: 1 }, { num1: 441216, num2: 441916, diff: 1 }, { num1: 795177, num2: 793177, diff: 1 }, { num1: 992852, num2: 992872, diff: 1 }, { num1: 169845, num2: 168845, diff: 1 }, { num1: 637853, num2: 634853, diff: 1 }, { num1: 579411, num2: 579411, diff: 0 }, { num1: 163452, num2: 162452, diff: 1 }, { num1: 719395, num2: 719395, diff: 0 }, { num1: 399827, num2: 399827, diff: 0 }, { num1: 318855, num2: 318855, diff: 0 }, { num1: 619429, num2: 619429, diff: 0 }, { num1: 744515, num2: 744595, diff: 1 }, { num1: 471766, num2: 471766, diff: 0 }, { num1: 494459, num2: 497459, diff: 1 }, { num1: 681247, num2: 681247, diff: 0 }, { num1: 435499, num2: 435499, diff: 0 }];
var list_6_2 = [{ num1: 996217, num2: 996217, diff: 0 }, { num1: 833975, num2: 833975, diff: 0 }, { num1: 342677, num2: 342677, diff: 0 }, { num1: 258821, num2: 158821, diff: 1 }, { num1: 286479, num2: 286479, diff: 0 }, { num1: 727632, num2: 728632, diff: 1 }, { num1: 513674, num2: 513774, diff: 1 }, { num1: 889111, num2: 839111, diff: 1 }, { num1: 625865, num2: 625865, diff: 0 }, { num1: 543211, num2: 543211, diff: 0 }, { num1: 391775, num2: 398775, diff: 1 }, { num1: 813789, num2: 813789, diff: 0 }, { num1: 973318, num2: 933318, diff: 1 }, { num1: 461715, num2: 461815, diff: 1 }, { num1: 849238, num2: 849238, diff: 0 }, { num1: 489765, num2: 487765, diff: 1 }, { num1: 995613, num2: 997613, diff: 1 }, { num1: 687836, num2: 687736, diff: 1 }, { num1: 773363, num2: 773363, diff: 0 }, { num1: 541333, num2: 541331, diff: 1 }, { num1: 613419, num2: 633419, diff: 1 }, { num1: 684567, num2: 684567, diff: 0 }, { num1: 699856, num2: 697856, diff: 1 }, { num1: 326321, num2: 726321, diff: 1 }, { num1: 589588, num2: 589581, diff: 1 }, { num1: 348928, num2: 349928, diff: 1 }, { num1: 439228, num2: 439228, diff: 0 }, { num1: 462332, num2: 462332, diff: 0 }, { num1: 371547, num2: 371547, diff: 0 }, { num1: 315242, num2: 315242, diff: 0 }, { num1: 244982, num2: 244982, diff: 0 }, { num1: 487273, num2: 487273, diff: 0 }];
var list_9_1 = [{ num1: 655158545, num2: 655159545, diff: 1 }, { num1: 755631382, num2: 715631382, diff: 1 }, { num1: 429676658, num2: 429676658, diff: 0 }, { num1: 123339491, num2: 123339491, diff: 0 }, { num1: 337264518, num2: 337364518, diff: 1 }, { num1: 774292158, num2: 774292158, diff: 0 }, { num1: 462863977, num2: 462853977, diff: 1 }, { num1: 557441586, num2: 557441586, diff: 0 }, { num1: 638451488, num2: 638451448, diff: 1 }, { num1: 124781993, num2: 124781993, diff: 0 }, { num1: 489253984, num2: 489253984, diff: 0 }, { num1: 612711329, num2: 612711329, diff: 0 }, { num1: 994758884, num2: 994758884, diff: 0 }, { num1: 552982517, num2: 552982717, diff: 1 }, { num1: 894888558, num2: 894888552, diff: 1 }, { num1: 319624678, num2: 319624676, diff: 1 }, { num1: 134884266, num2: 134884286, diff: 1 }, { num1: 668675479, num2: 668675479, diff: 0 }, { num1: 826244837, num2: 826244837, diff: 0 }, { num1: 426825742, num2: 226825742, diff: 1 }, { num1: 696926647, num2: 696926647, diff: 0 }, { num1: 774943459, num2: 774943459, diff: 0 }, { num1: 635584835, num2: 635584135, diff: 1 }, { num1: 221312499, num2: 221312499, diff: 0 }, { num1: 485946123, num2: 485946323, diff: 1 }, { num1: 165385275, num2: 155385275, diff: 1 }, { num1: 371157212, num2: 371157212, diff: 0 }, { num1: 798167258, num2: 798169258, diff: 1 }, { num1: 272798239, num2: 272793239, diff: 1 }, { num1: 355273868, num2: 355273868, diff: 0 }, { num1: 155149126, num2: 155149126, diff: 0 }, { num1: 133862359, num2: 133842359, diff: 1 }];
var list_9_2 = [{ num1: 222379268, num2: 222379263, diff: 1 }, { num1: 241516211, num2: 245516211, diff: 1 }, { num1: 632571458, num2: 632571458, diff: 0 }, { num1: 189683717, num2: 189683717, diff: 0 }, { num1: 683175529, num2: 683175539, diff: 1 }, { num1: 179968566, num2: 179968561, diff: 1 }, { num1: 816765324, num2: 816765324, diff: 0 }, { num1: 788581391, num2: 788581491, diff: 1 }, { num1: 745459366, num2: 745459266, diff: 1 }, { num1: 282974472, num2: 232974472, diff: 1 }, { num1: 561592926, num2: 561592926, diff: 0 }, { num1: 857199262, num2: 857299262, diff: 1 }, { num1: 186179935, num2: 186179935, diff: 0 }, { num1: 283899443, num2: 283899443, diff: 0 }, { num1: 291985964, num2: 291985964, diff: 0 }, { num1: 568315732, num2: 568315732, diff: 0 }, { num1: 288627816, num2: 288687816, diff: 1 }, { num1: 463228513, num2: 263228513, diff: 1 }, { num1: 931558484, num2: 931558484, diff: 0 }, { num1: 374999154, num2: 374991154, diff: 1 }, { num1: 738343986, num2: 738343986, diff: 0 }, { num1: 181943896, num2: 181943896, diff: 0 }, { num1: 235441464, num2: 235441464, diff: 0 }, { num1: 376131532, num2: 376139532, diff: 1 }, { num1: 176544892, num2: 176574892, diff: 1 }, { num1: 153262996, num2: 153262996, diff: 0 }, { num1: 313545498, num2: 313545498, diff: 0 }, { num1: 441981689, num2: 441981689, diff: 0 }, { num1: 442952271, num2: 442952221, diff: 1 }, { num1: 841389785, num2: 851389785, diff: 1 }, { num1: 812196745, num2: 812186745, diff: 1 }, { num1: 693795843, num2: 693795843, diff: 0 }];

// Function to create stimulus on the screen
function createStimulus(num1, num2) {
    return `<p class="stimulus-text">${num1}&emsp;&emsp;&emsp;&emsp;&emsp;${num2}</p>`;
}


// Function to play sound
function playSound(filename) {
    let audio = new Audio(`public/audios/${filename}.mp3`);
    audio.play();
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
}

// Instructions
var welcome = {
	type: jsPsychHtmlButtonResponse,
	stimulus: "<p><b>Comparing Numbers</b></p>" +
              "<p>Press START to read the instructions.</p>",
	choices: ["START"]
}

// Incoming Transmission (last for 3 secs)
var instructions_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div id="intro-section" class="fade-in">
            <p><b>🚨 Incoming Transmission 🚨</b></p>
            <p>Welcome, Operative. The system is under siege.</p>
            <p>Your task: Analyze encrypted data streams and detect anomalies.</p>
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
    }
};


// Identification Protocol
var instructions_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div id="protocol-section"  class="fade-in">
            <p>Each sequence contains two sets of numbers.</p>
            <p>If the sequences are an exact match, the code is <span style="color:green">AUTHENTIC</span>.</p>
            <p>If they differ, the code has been <span style="color:red">TAMPERED</span> with.</p><br>
        
            <p>🔹 Press <span style="color:green"><b>D</b></span> to confirm authenticity.</p>
            <p>🔹 Press <span style="color:red"><b>K</b></span> to reject compromised data.</p> <br>
        
            <p>Stay sharp. Stay fast. The firewall won’t hold forever.</p><br>
        </div>
    `,
    choices: ['<button class="custom-button">CONTINUE</button>'],
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


var practice_same = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus(591, 591),
    choices: ['d'],
    prompt: `<br><br><p>These ARE exactly the same, so press <span style="color:green"><b>D</b></span> for YES.</p>`
}

var practice_diff = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: createStimulus(624, 614),
    choices: ['k'],
    prompt: `<br><br><p>These are NOT the same, so press <span style="color:red"><b>K</b></span> for NO.</p>`
};

// instructions before experimental trials
var instructions_3 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div id="protocol-section"  class="fade-in">
        <p>If the numbers are an exact match, hit <span style="color:green"><b>D</b></span>.<br>
        If the numbers don’t match, hit <span style="color:red"><b>K</b></span>.</p>

        <p>Keep your fingers ready. The clock is ticking.<br>
        No second chances. No room for hesitation.</p>

        <p><b>Press CONTINUE to begin the operation.</b></p>
        <br><br>
    </div>
    `,
    choices: ['<button class="custom-button">CONTINUE</button>'],
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


var block_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() { 
        return `
        <div id="transition"  class="fade-in">
            <p>Decrypting next set of codes...</p><br>
            <p>There will be ${jsPsych.timelineVariable('setsize')} digits in each set.</p><br><br>
        </div>
        `;
    },
    choices: ['<button class="custom-button">CONTINUE</button>'],
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

var trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: function() {return createStimulus(jsPsych.timelineVariable('num1'), jsPsych.timelineVariable('num2'))},
	choices: ['d', 'k'],
    on_start: function(data) {
        // Sample one more than the set size. Extra is used when patterns are different
        var diff = jsPsych.timelineVariable('diff')
        condition = diff == 1 ? "diff" : "same";
        correct_response = diff == 1 ? "k" : "d";
        
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
        data.num1 = jsPsych.timelineVariable('num1');
        data.num2 = jsPsych.timelineVariable('num2');
        data.setsize = jsPsych.timelineVariable('setsize');
        data.condition = condition;
        data.correct_response = correct_response;
        data.timeout = timeout; // Indicate whether the block timed out on that trial

        // Play correct or wrong sound
        if (data.accuracy === 1) {
            playSound('correct');
        } else {
            playSound('wrong');
        }

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
    stimulus: `
        <div id="conclusion-screen"  class="fade-in">
            <p><b>MISSION ACCOMPLISHED ✅</b></p>
            <p>Operative, your decryption skills are unmatched.</p>
            <p>The system is secure for now!</p><br><br>
            <p><b>Press any key to exit.</b></p>
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
			var filename = "data_digit-comparison_" + subject + ".csv";
			jsPsych.data.get().localSave('csv', filename);
		}
	}
    };

////////////////////// PART 3: PUT TIMELINE TOGETHER ///////////////////////////////

var timeline = [
    get_subject_id, // get_location,
    welcome, enter_fullscreen, instructions_1, instructions_2, practice_same, practice_diff, instructions_3,
    block_3_1, block_6_1, block_9_1, block_3_2, block_6_2, block_9_2,
    conclusion, exit_fullscreen
];

// Run experiment
jsPsych.run(timeline);