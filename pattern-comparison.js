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
]

var startposindex; // Array containing positions of lines that will be shown on the screen
var condition; // Container of string indicating whether condition is same or different
var correct_response; // Numeric container indicating whether subject's response is correct = 1
var block_trial_count = 0; // set up trial count within block
var start_time; // set up timer objects for timeout
var end_timer;
var timeout = 0; // Numeric container indicating whether block timed out at this trial
var subject; // String container of subject ID to be used appended to saved files at the end
var online = 0; // Numeric container indicating whether task is being administered online

// Hardcode order of conditions to ensure that subjects still get an equal distribution of same and different even if they only get to beginning trials
var list_3_1 = [{ posindex: [5, 20, 15, 19], diff: 1, cr: 'k' }, { posindex: [24, 13, 17, 5], diff: 0, cr: 'd' }, { posindex: [2, 19, 16, 17], diff: 1, cr: 'k' }, { posindex: [3, 4, 15, 14], diff: 0, cr: 'd' }, { posindex: [23, 21, 16, 10], diff: 1, cr: 'k' }, { posindex: [12, 6, 8, 9], diff: 1, cr: 'k' }, { posindex: [22, 8, 2, 4], diff: 0, cr: 'd' }, { posindex: [15, 19, 1, 20], diff: 0, cr: 'd' }, { posindex: [12, 2, 4, 19], diff: 1, cr: 'k' }, { posindex: [24, 18, 1, 6], diff: 0, cr: 'd' }, { posindex: [18, 16, 17, 13], diff: 1, cr: 'k' }, { posindex: [20, 15, 5, 10], diff: 0, cr: 'd' }, { posindex: [6, 8, 1, 4], diff: 0, cr: 'd' }, { posindex: [12, 14, 19, 2], diff: 1, cr: 'k' }, { posindex: [9, 10, 7, 8], diff: 1, cr: 'k' }, { posindex: [11, 6, 9, 18], diff: 0, cr: 'd' }, { posindex: [18, 3, 1, 16], diff: 1, cr: 'k' }, { posindex: [6, 24, 15, 9], diff: 0, cr: 'd' }, { posindex: [16, 5, 18, 17], diff: 0, cr: 'd' }, { posindex: [20, 5, 19, 18], diff: 0, cr: 'd' }, { posindex: [7, 9, 12, 6], diff: 1, cr: 'k' }, { posindex: [22, 23, 20, 6], diff: 1, cr: 'k' }, { posindex: [23, 22, 12, 7], diff: 0, cr: 'd' }, { posindex: [3, 7, 1, 24], diff: 1, cr: 'k' }, { posindex: [3, 22, 5, 2], diff: 0, cr: 'd' }, { posindex: [17, 20, 12, 19], diff: 0, cr: 'd' }, { posindex: [13, 15, 2, 12], diff: 0, cr: 'd' }, { posindex: [23, 2, 7, 20], diff: 0, cr: 'd' }, { posindex: [6, 23, 21, 14], diff: 1, cr: 'k' }, { posindex: [12, 11, 6, 9], diff: 1, cr: 'k' }, { posindex: [13, 18, 11, 4], diff: 1, cr: 'k' }, { posindex: [18, 23, 12, 22], diff: 1, cr: 'k' }];
var list_3_2 = [{ posindex: [22, 9, 10, 2], diff: 1, cr: 'k' }, { posindex: [21, 7, 18, 3], diff: 1, cr: 'k' }, { posindex: [1, 12, 5, 16], diff: 1, cr: 'k' }, { posindex: [11, 16, 8, 24], diff: 0, cr: 'd' }, { posindex: [18, 1, 3, 22], diff: 1, cr: 'k' }, { posindex: [5, 19, 6, 24], diff: 0, cr: 'd' }, { posindex: [17, 8, 18, 5], diff: 0, cr: 'd' }, { posindex: [19, 22, 11, 10], diff: 1, cr: 'k' }, { posindex: [24, 16, 15, 20], diff: 1, cr: 'k' }, { posindex: [1, 4, 12, 7], diff: 1, cr: 'k' }, { posindex: [19, 5, 16, 18], diff: 0, cr: 'd' }, { posindex: [21, 8, 3, 13], diff: 0, cr: 'd' }, { posindex: [4, 2, 23, 5], diff: 1, cr: 'k' }, { posindex: [11, 17, 3, 5], diff: 0, cr: 'd' }, { posindex: [7, 14, 6, 19], diff: 0, cr: 'd' }, { posindex: [20, 7, 16, 11], diff: 0, cr: 'd' }, { posindex: [1, 24, 2, 13], diff: 1, cr: 'k' }, { posindex: [3, 4, 14, 18], diff: 1, cr: 'k' }, { posindex: [9, 16, 21, 22], diff: 0, cr: 'd' }, { posindex: [12, 17, 4, 5], diff: 0, cr: 'd' }, { posindex: [2, 5, 7, 10], diff: 1, cr: 'k' }, { posindex: [4, 22, 19, 20], diff: 1, cr: 'k' }, { posindex: [7, 21, 13, 23], diff: 1, cr: 'k' }, { posindex: [3, 17, 22, 1], diff: 0, cr: 'd' }, { posindex: [12, 11, 20, 5], diff: 1, cr: 'k' }, { posindex: [16, 5, 14, 19], diff: 1, cr: 'k' }, { posindex: [21, 8, 17, 6], diff: 0, cr: 'd' }, { posindex: [23, 17, 10, 22], diff: 1, cr: 'k' }, { posindex: [12, 9, 22, 19], diff: 0, cr: 'd' }, { posindex: [1, 10, 21, 5], diff: 0, cr: 'd' }, { posindex: [19, 3, 20, 11], diff: 0, cr: 'd' }, { posindex: [10, 12, 3, 15], diff: 0, cr: 'd' }];
var list_6_1 = [{ posindex: [24, 20, 9, 11, 23, 3, 4], diff: 0, cr: 'd' }, { posindex: [20, 23, 11, 4, 14, 18, 5], diff: 0, cr: 'd' }, { posindex: [12, 14, 13, 21, 3, 20, 9], diff: 0, cr: 'd' }, { posindex: [12, 10, 11, 3, 19, 24, 1], diff: 0, cr: 'd' }, { posindex: [22, 24, 2, 8, 18, 11, 12], diff: 1, cr: 'k' }, { posindex: [10, 1, 24, 12, 11, 17, 5], diff: 1, cr: 'k' }, { posindex: [12, 18, 1, 9, 13, 10, 22], diff: 1, cr: 'k' }, { posindex: [2, 20, 12, 19, 22, 4, 1], diff: 0, cr: 'd' }, { posindex: [6, 10, 9, 16, 17, 8, 4], diff: 0, cr: 'd' }, { posindex: [4, 11, 13, 20, 21, 24, 3], diff: 1, cr: 'k' }, { posindex: [13, 10, 12, 19, 17, 22, 1], diff: 0, cr: 'd' }, { posindex: [15, 7, 17, 5, 11, 20, 14], diff: 1, cr: 'k' }, { posindex: [22, 17, 18, 4, 13, 9, 12], diff: 1, cr: 'k' }, { posindex: [8, 12, 19, 11, 10, 21, 7], diff: 1, cr: 'k' }, { posindex: [10, 24, 5, 11, 20, 15, 21], diff: 0, cr: 'd' }, { posindex: [4, 6, 10, 2, 13, 8, 16], diff: 1, cr: 'k' }, { posindex: [4, 22, 12, 9, 14, 10, 11], diff: 0, cr: 'd' }, { posindex: [15, 17, 8, 24, 19, 4, 3], diff: 0, cr: 'd' }, { posindex: [7, 1, 12, 18, 10, 24, 21], diff: 0, cr: 'd' }, { posindex: [3, 23, 6, 1, 17, 4, 13], diff: 0, cr: 'd' }, { posindex: [1, 17, 6, 15, 22, 5, 21], diff: 1, cr: 'k' }, { posindex: [3, 12, 19, 9, 7, 8, 14], diff: 0, cr: 'd' }, { posindex: [9, 2, 1, 14, 4, 8, 21], diff: 0, cr: 'd' }, { posindex: [16, 19, 8, 24, 3, 22, 21], diff: 1, cr: 'k' }, { posindex: [3, 7, 18, 2, 10, 12, 13], diff: 1, cr: 'k' }, { posindex: [10, 3, 4, 20, 18, 6, 13], diff: 1, cr: 'k' }, { posindex: [15, 24, 8, 4, 23, 16, 10], diff: 0, cr: 'd' }, { posindex: [11, 8, 13, 2, 10, 24, 21], diff: 1, cr: 'k' }, { posindex: [17, 4, 13, 1, 7, 10, 3], diff: 1, cr: 'k' }, { posindex: [18, 13, 21, 11, 24, 5, 1], diff: 1, cr: 'k' }, { posindex: [6, 18, 20, 8, 17, 16, 15], diff: 0, cr: 'd' }, { posindex: [5, 9, 11, 6, 24, 10, 17], diff: 1, cr: 'k' }];
var list_6_2 = [{ posindex: [22, 5, 9, 21, 10, 16, 2], diff: 1, cr: 'k' }, { posindex: [7, 18, 9, 11, 5, 19, 12], diff: 0, cr: 'd' }, { posindex: [24, 3, 14, 5, 11, 12, 15], diff: 1, cr: 'k' }, { posindex: [14, 9, 17, 20, 5, 16, 23], diff: 0, cr: 'd' }, { posindex: [9, 8, 5, 21, 11, 22, 6], diff: 1, cr: 'k' }, { posindex: [7, 13, 24, 21, 22, 8, 18], diff: 1, cr: 'k' }, { posindex: [12, 17, 9, 8, 19, 10, 6], diff: 1, cr: 'k' }, { posindex: [20, 15, 16, 14, 17, 5, 3], diff: 0, cr: 'd' }, { posindex: [9, 11, 13, 8, 19, 23, 17], diff: 0, cr: 'd' }, { posindex: [5, 13, 10, 16, 23, 19, 8], diff: 0, cr: 'd' }, { posindex: [2, 12, 8, 5, 20, 13, 21], diff: 1, cr: 'k' }, { posindex: [4, 12, 18, 7, 16, 17, 11], diff: 1, cr: 'k' }, { posindex: [6, 21, 23, 17, 18, 2, 5], diff: 0, cr: 'd' }, { posindex: [10, 14, 15, 22, 1, 24, 13], diff: 1, cr: 'k' }, { posindex: [9, 1, 6, 16, 4, 10, 3], diff: 0, cr: 'd' }, { posindex: [15, 23, 2, 17, 22, 16, 7], diff: 0, cr: 'd' }, { posindex: [3, 8, 17, 14, 2, 4, 22], diff: 1, cr: 'k' }, { posindex: [13, 18, 21, 1, 19, 4, 3], diff: 1, cr: 'k' }, { posindex: [23, 1, 12, 17, 24, 7, 3], diff: 1, cr: 'k' }, { posindex: [8, 24, 9, 15, 12, 3, 5], diff: 0, cr: 'd' }, { posindex: [2, 9, 11, 8, 7, 22, 21], diff: 1, cr: 'k' }, { posindex: [10, 24, 17, 18, 2, 11, 23], diff: 0, cr: 'd' }, { posindex: [2, 18, 24, 6, 10, 3, 12], diff: 1, cr: 'k' }, { posindex: [12, 7, 8, 10, 1, 11, 21], diff: 0, cr: 'd' }, { posindex: [8, 13, 15, 21, 12, 16, 17], diff: 1, cr: 'k' }, { posindex: [17, 24, 13, 2, 7, 21, 14], diff: 0, cr: 'd' }, { posindex: [16, 3, 17, 24, 11, 7, 18], diff: 0, cr: 'd' }, { posindex: [16, 10, 3, 24, 14, 13, 9], diff: 0, cr: 'd' }, { posindex: [14, 16, 13, 11, 15, 1, 18], diff: 0, cr: 'd' }, { posindex: [19, 17, 24, 12, 4, 20, 2], diff: 0, cr: 'd' }, { posindex: [13, 15, 14, 6, 20, 8, 18], diff: 1, cr: 'k' }, { posindex: [12, 7, 4, 11, 1, 21, 13], diff: 1, cr: 'k' }];
var list_9_1 = [{ posindex: [22, 15, 13, 18, 24, 16, 1, 3, 14, 4], diff: 1, cr: 'k' }, { posindex: [15, 9, 23, 5, 10, 13, 14, 7, 18, 12], diff: 0, cr: 'd' }, { posindex: [1, 15, 4, 2, 12, 5, 18, 23, 7, 21], diff: 0, cr: 'd' }, { posindex: [12, 21, 9, 13, 8, 20, 10, 14, 15, 1], diff: 0, cr: 'd' }, { posindex: [21, 20, 22, 9, 8, 2, 3, 10, 19, 23], diff: 1, cr: 'k' }, { posindex: [20, 23, 24, 4, 12, 11, 9, 2, 22, 7], diff: 1, cr: 'k' }, { posindex: [10, 13, 3, 21, 8, 18, 9, 5, 24, 22], diff: 0, cr: 'd' }, { posindex: [18, 17, 16, 11, 5, 3, 4, 12, 8, 23], diff: 0, cr: 'd' }, { posindex: [20, 22, 15, 7, 19, 9, 12, 24, 3, 14], diff: 1, cr: 'k' }, { posindex: [17, 18, 19, 2, 7, 14, 20, 13, 3, 24], diff: 1, cr: 'k' }, { posindex: [17, 10, 19, 22, 15, 8, 4, 5, 3, 1], diff: 1, cr: 'k' }, { posindex: [24, 22, 18, 9, 15, 3, 6, 10, 17, 2], diff: 0, cr: 'd' }, { posindex: [4, 24, 17, 16, 1, 10, 8, 7, 6, 5], diff: 1, cr: 'k' }, { posindex: [11, 5, 7, 16, 20, 2, 1, 9, 24, 23], diff: 0, cr: 'd' }, { posindex: [12, 3, 2, 5, 24, 18, 9, 1, 4, 21], diff: 1, cr: 'k' }, { posindex: [21, 18, 20, 19, 22, 10, 4, 15, 7, 6], diff: 0, cr: 'd' }, { posindex: [19, 21, 16, 12, 4, 3, 15, 20, 11, 7], diff: 1, cr: 'k' }, { posindex: [11, 12, 14, 9, 20, 4, 3, 7, 10, 6], diff: 1, cr: 'k' }, { posindex: [17, 18, 6, 23, 11, 22, 15, 20, 12, 24], diff: 0, cr: 'd' }, { posindex: [10, 14, 12, 21, 6, 24, 4, 19, 1, 16], diff: 1, cr: 'k' }, { posindex: [16, 13, 7, 24, 14, 10, 20, 17, 4, 1], diff: 0, cr: 'd' }, { posindex: [18, 20, 15, 22, 6, 16, 10, 1, 19, 24], diff: 0, cr: 'd' }, { posindex: [1, 22, 17, 7, 5, 20, 2, 11, 4, 21], diff: 0, cr: 'd' }, { posindex: [2, 19, 16, 11, 18, 6, 15, 23, 4, 14], diff: 1, cr: 'k' }, { posindex: [23, 12, 24, 19, 14, 1, 13, 10, 11, 15], diff: 1, cr: 'k' }, { posindex: [12, 18, 4, 16, 8, 24, 9, 11, 20, 13], diff: 0, cr: 'd' }, { posindex: [19, 2, 9, 7, 22, 21, 13, 12, 16, 3], diff: 0, cr: 'd' }, { posindex: [23, 10, 7, 1, 20, 13, 19, 15, 2, 22], diff: 1, cr: 'k' }, { posindex: [20, 24, 2, 3, 13, 19, 5, 11, 1, 6], diff: 0, cr: 'd' }, { posindex: [8, 12, 16, 23, 14, 11, 10, 13, 5, 6], diff: 1, cr: 'k' }, { posindex: [12, 3, 23, 15, 19, 5, 24, 6, 16, 9], diff: 0, cr: 'd' }, { posindex: [23, 1, 19, 3, 10, 7, 21, 24, 18, 2], diff: 1, cr: 'k' }];
var list_9_2 = [{ posindex: [3, 16, 20, 15, 19, 4, 8, 17, 7, 12], diff: 0, cr: 'd' }, { posindex: [10, 6, 16, 13, 23, 14, 2, 15, 12, 3], diff: 1, cr: 'k' }, { posindex: [11, 4, 1, 19, 2, 14, 3, 21, 20, 9], diff: 0, cr: 'd' }, { posindex: [18, 14, 9, 13, 20, 2, 7, 19, 16, 17], diff: 0, cr: 'd' }, { posindex: [4, 22, 23, 24, 13, 7, 6, 19, 2, 12], diff: 1, cr: 'k' }, { posindex: [20, 14, 21, 5, 22, 11, 13, 8, 3, 19], diff: 1, cr: 'k' }, { posindex: [14, 23, 15, 5, 6, 4, 10, 7, 1, 24], diff: 0, cr: 'd' }, { posindex: [20, 8, 23, 11, 2, 3, 9, 16, 24, 21], diff: 0, cr: 'd' }, { posindex: [13, 21, 6, 4, 16, 10, 22, 1, 9, 5], diff: 1, cr: 'k' }, { posindex: [13, 6, 10, 23, 15, 8, 14, 16, 1, 7], diff: 1, cr: 'k' }, { posindex: [3, 21, 24, 10, 20, 8, 16, 18, 7, 2], diff: 1, cr: 'k' }, { posindex: [12, 3, 21, 20, 11, 9, 2, 4, 5, 17], diff: 1, cr: 'k' }, { posindex: [23, 1, 13, 11, 14, 24, 6, 22, 19, 12], diff: 1, cr: 'k' }, { posindex: [18, 16, 9, 8, 22, 5, 6, 4, 1, 13], diff: 0, cr: 'd' }, { posindex: [24, 7, 14, 22, 9, 18, 3, 1, 21, 10], diff: 0, cr: 'd' }, { posindex: [22, 24, 8, 1, 19, 9, 3, 7, 15, 10], diff: 0, cr: 'd' }, { posindex: [11, 24, 16, 23, 5, 10, 3, 21, 7, 13], diff: 1, cr: 'k' }, { posindex: [22, 12, 21, 13, 23, 14, 2, 11, 15, 24], diff: 1, cr: 'k' }, { posindex: [10, 18, 9, 2, 5, 21, 24, 1, 15, 3], diff: 0, cr: 'd' }, { posindex: [2, 18, 21, 19, 3, 23, 17, 15, 14, 12], diff: 1, cr: 'k' }, { posindex: [13, 6, 18, 15, 11, 5, 16, 2, 21, 9], diff: 0, cr: 'd' }, { posindex: [23, 20, 17, 15, 10, 8, 7, 2, 16, 1], diff: 0, cr: 'd' }, { posindex: [22, 6, 19, 2, 4, 9, 16, 18, 23, 8], diff: 1, cr: 'k' }, { posindex: [8, 14, 2, 17, 9, 12, 10, 22, 11, 5], diff: 0, cr: 'd' }, { posindex: [1, 24, 23, 16, 19, 7, 3, 20, 12, 14], diff: 0, cr: 'd' }, { posindex: [4, 7, 14, 20, 9, 24, 16, 19, 3, 21], diff: 0, cr: 'd' }, { posindex: [19, 14, 4, 15, 8, 13, 7, 9, 1, 17], diff: 1, cr: 'k' }, { posindex: [22, 15, 2, 8, 6, 3, 17, 4, 13, 19], diff: 0, cr: 'd' }, { posindex: [9, 14, 16, 11, 15, 2, 5, 7, 21, 22], diff: 0, cr: 'd' }, { posindex: [2, 11, 23, 17, 5, 16, 8, 22, 10, 6], diff: 1, cr: 'k' }, { posindex: [24, 4, 12, 11, 23, 22, 13, 8, 1, 6], diff: 1, cr: 'k' }, { posindex: [4, 18, 14, 20, 17, 11, 8, 16, 24, 22], diff: 1, cr: 'k' }];

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
}

///////////////////////////////// PART 2: Set-up nodes //////////////////////////////////
// 		1. enter_fullscreen
//		2. get_participant_id: Get participant ID
//		3. get_location: Determine whether task is being run through platform or through local files

var enter_fullscreen = {
	type: jsPsychFullscreen,
	fullscreen_mode: true
}

var exit_fullscreen = {
	type: jsPsychFullscreen,
	fullscreen_mode: false
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
	stimulus: "<p><b>Comparing Patterns</b></p>" +
              "<p>Press START to read the instructions.</p>",
	choices: ["CONTINUE"]
}

var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p>In this task, you will see 2 patterns on each screen. One will be <font color="blue">blue</font> and one will be <font color="ffff00">yellow</font>.<br>
      Your job is to judge whether the two patterns are the <b>same</b>.</p>
      <p>Press the <b>D</b> key if, yes, the patterns <b>ARE</b> exactly the same.<br>
      Press the <b>K</b> key if, no, the patterns are <b>NOT</b> exactly the same.</p>
      <p>We'll show you some examples to get you started.</p>
      <p>Click <b>CONTINUE</b> to begin the practice session.</p>
      <br>
      <br>
    `,
  choices: ['CONTINUE'],
  post_trial_gap: 500
};

var practice_same = {
    type: jsPsychCanvasKeyboardResponse,
    stimulus: drawPatterns,
    canvas_size: [screen_height, screen_width],
    choices: ['d'],
    prompt: `<p>These ARE exactly the same, so press D for YES.</p>`,
    on_start: function() {
        startposindex = [8, 12, 17, 1],
        condition = "same"
    }
}

var practice_diff = {
    type: jsPsychCanvasKeyboardResponse,
    stimulus: drawPatterns,
    canvas_size: [screen_height, screen_width],
    choices: ['k'],
    prompt: `<p>These are NOT the same, so press K for NO.</p>`,
    on_start: function() {
        startposindex = [18, 10, 17, 11],
        condition = "diff"
    }
};

// instructions before experimental trials
var instructions_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p>Please keep your fingers on the D and K keys so you can respond quickly.<br>
    In each group of trials, the patterns will be more or less complex.<br>
    We know that you might make some mistakes--everyone does! But, please try to go as fast as you can while still being accurate.</p>
    <p><b>REMINDER:</b><br>
    Press the <b>D</b> key if, <b>yes</b>, the patterns <b>ARE</b> exactly the same.<br>
    Press the <b>K</b> key if, <b>no</b>, the patterns are <b>NOT</b> exactly the same.</p>
    <p>If you have any questions please ask the experimenter now.</p></p>
    <p> Click <b>CONTINUE</b> to begin.</p>
    <br>
    <br>
        `,
  choices: ['CONTINUE']
};

var block_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() { return "<p>In this group of trials, there will be " + jsPsych.timelineVariable('setsize') + " lines in each pattern.</p><br><br>"},
    choices: ["CONTINUE"],
    on_start: function() {
        clearTimeout(end_timer);
        timeout = 0;

        // console.log(timeout); // Here to debug
    }
}

var trial = {
	type: jsPsychCanvasKeyboardResponse,
	stimulus: drawPatterns,
	canvas_size: [screen_height, screen_width],
	choices: ['d', 'k'],
    on_start: function(data) {
        // Sample one more than the set size. Extra is used when patterns are different
        startposindex = jsPsych.timelineVariable('posindex')
        var diff = jsPsych.timelineVariable('diff')
        condition = diff == 1 ? "diff" : "same";
        correct_response = jsPsych.timelineVariable('cr');

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
        data.pattern = jsPsych.timelineVariable('posindex');
        data.setsize = jsPsych.timelineVariable('setsize');
        data.condition = condition;
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
			var filename = "data_pattern-comparison_" + subject + ".csv";
			jsPsych.data.get().localSave('csv', filename);
		}
	},
    on_finish: function() {
        jsPsych.endExperiment()
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