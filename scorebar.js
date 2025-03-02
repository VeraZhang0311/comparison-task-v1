document.addEventListener("DOMContentLoaded", function () {

    function createScoreBar() {
        if (!document.getElementById("score-bar-container")) {
            let scoreBarContainer = document.createElement("div");
            scoreBarContainer.id = "score-bar-container";
            scoreBarContainer.style.display = "none"; // Initially hidden

            let scoreBar = document.createElement("div");
            scoreBar.id = "score-bar";

            let scoreText = document.createElement("div");
            scoreText.id = "score-text";
            scoreText.innerText = "Accuracy: 0%"; 

            scoreBarContainer.appendChild(scoreBar);
            scoreBarContainer.appendChild(scoreText);
            document.body.appendChild(scoreBarContainer);
        }
    }

    function updateScoreBar() {
        let scoreBar = document.getElementById("score-bar");
        let scoreText = document.getElementById("score-text");

        if (total_trials > 0) {
            let accuracy = Math.round((total_correct / total_trials) * 100);
            scoreBar.style.width = accuracy + "%";
            scoreText.innerText = `Accuracy: ${accuracy}%`;

            scoreBar.style.backgroundColor = accuracy < 85 ? "red" : "green";
        } else {
            scoreBar.style.width = "0%";
            scoreText.innerText = "Accuracy: 0%";
            scoreBar.style.backgroundColor = "green"; 
        }
    }

    function resetScoreBar() {
        total_correct = 0;
        total_trials = 0;
        experimentStarted = false;
        updateScoreBar();
    }

    function showScoreBar() {
        let scoreBarContainer = document.getElementById("score-bar-container");
        if (scoreBarContainer) {
            scoreBarContainer.style.display = "block";
        }
    }
    

    function hideScoreBar() {
        let scoreBarContainer = document.getElementById("score-bar-container");
        if (scoreBarContainer) {
            scoreBarContainer.style.display = "none";
        }
    }
    

    window.updateScoreBar = updateScoreBar;
    window.resetScoreBar = resetScoreBar;
    window.showScoreBar = showScoreBar;
    window.hideScoreBar = hideScoreBar;

    document.addEventListener("jspsych-run", function () {
        createScoreBar();
    });

    setTimeout(createScoreBar, 1000);
});
