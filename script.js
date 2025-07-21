document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".code");

  inputs.forEach((input, idx) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;

      // Allow only digits
      if (!/^\d$/.test(value)) {
        e.target.value = "";
        return;
      }

      // Move focus to next input
      if (idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        e.preventDefault();

        if (input.value !== "") {
          // Clear current input
          input.value = "";
        } else if (idx > 0) {
          // Move focus back and clear
          setTimeout(() => {
            inputs[idx - 1].focus();
            inputs[idx - 1].value = "";
          }, 0);
        }
      } else if (e.key >= "0" && e.key <= "9") {
        // Let input handler process digit
      } else if (e.key === "ArrowLeft" && idx > 0) {
        inputs[idx - 1].focus();
        e.preventDefault();
      } else if (e.key === "ArrowRight" && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
        e.preventDefault();
      } else if (e.key !== "Tab") {
        e.preventDefault();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();

      const pasteData = e.clipboardData.getData("text").trim();
      if (!/^\d+$/.test(pasteData)) return;

      let currentIdx = idx;
      for (const char of pasteData) {
        if (currentIdx >= inputs.length) break;
        inputs[currentIdx].value = char;
        currentIdx++;
      }

      if (currentIdx < inputs.length) {
        inputs[currentIdx].focus();
      } else {
        inputs[inputs.length - 1].focus();
      }
    });
  });

  // Auto-focus first input
  if (inputs.length > 0) {
    inputs[0].focus();
  }
});
