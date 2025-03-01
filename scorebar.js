document.addEventListener("DOMContentLoaded", function () {
    // Check if the score bar is still in the DOM, if not, re-add it
    setTimeout(() => {
        if (!document.getElementById("score-bar-container")) {
            let scoreBarContainer = document.createElement("div");
            scoreBarContainer.id = "score-bar-container";
            scoreBarContainer.style.position = "fixed";
            scoreBarContainer.style.top = "10px";
            scoreBarContainer.style.left = "10px";
            scoreBarContainer.style.width = "200px";
            scoreBarContainer.style.height = "20px";
            scoreBarContainer.style.backgroundColor = "gray";
            scoreBarContainer.style.borderRadius = "5px";
            scoreBarContainer.style.overflow = "hidden";
            scoreBarContainer.style.zIndex = "9999";

            let scoreBar = document.createElement("div");
            scoreBar.id = "score-bar";
            scoreBar.style.width = "0%";
            scoreBar.style.height = "100%";
            scoreBar.style.backgroundColor = "green";
            scoreBar.style.transition = "width 0.3s ease-in-out";

            scoreBarContainer.appendChild(scoreBar);
            document.body.appendChild(scoreBarContainer);
        }
    }, 1000); // Delay to ensure jsPsych is initialized
});
