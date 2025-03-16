document.getElementById("searchBtn").addEventListener("click", function () {
    const word = document.getElementById("wordInput").value.trim();
    if (!word) {
      alert("Please enter a word.");
      return;
    }
  
    // Step 1: Fetch Translation
    const translationApiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|hi`;
  
    fetch(translationApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const translation = data.responseData.translatedText;
  
        // Step 2: Fetch a Random Joke
        fetch("https://v2.jokeapi.dev/joke/Any?type=single")
          .then((response) => response.json())
          .then((jokeData) => {
            const joke = jokeData.joke;
            displayResult(translation, joke);
          })
          .catch((error) => {
            console.error("Joke fetch error:", error);
            displayResult(translation, "Could not fetch a joke. Try again!");
          });
      })
      .catch((error) => {
        document.getElementById("result").innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
      });
  });
  
  function displayResult(translation, joke) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <div class="translation">
        <p><strong>Hindi Translation:</strong> ${translation}</p>
      </div>
      <div class="joke">
        <p><strong>Funny Joke:</strong> ${joke}</p>
      </div>
    `;
  }