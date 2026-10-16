
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "dashboard";

// Then, we create an object that stores the data for each scene,
const scenes = {
  dashboard: {
    title: "Developer Dashboard",
    text: "Message: You are a solo developer working on a big indie project and it would suck if your source code was leaked. Well, that’s exactly what has happened. You need to act fast to prevent the leak from propagating all over the internet by finding the origin of the leak and attempting to take it down. Go through websites like GitHub and Google Drive to try to find it. Good luck.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Go to GitHub",
        nextScene: "github"
      },
      {
        text: "Go to YouTube",
        nextScene: "youtube"
      },
      {
          text: "Go to Reddit",
          action: function () {
            redditUnblock();
            updateHealth(-5);
          }
      },
      {
          text: "Go to Google Drive",
          action: function () {
            gDriveInfo();
            updateHealth(-5);
          }
      },
      {
          text: "Go to MediaFire",
          action: function () {
            mediaFireInfo();
            updateHealth(-5);
          }
      },
      {
          text: "Browse the web",
          nextScene: "reddit"
      },
      {
          text: "File a claim",
          action: function () {
            fileClaim();
          }
      }
    ]
  },

  github: {
    title: "GitHub",
    text: "This is GitHub, it is where your project’s source code is kept in a private repository. There is a chance the leak could be here. Someone could’ve possibly cloned your project as in the past, you weren’t nearly as cautious as you are today. Maybe you gave someone permission to access your repo—maybe you let someone use your computer.",
    choices: [
      {
        text: "Search around on your own",
        action: function () {
          updateHealth(-10)
        },
        nextScene: "b"
      },
      {
        text: "Ask a fellow developer to help",
        action: function () {
          pickUpItem("Google Drive links")
        },
        nextScene: "hallway"
      },
      {
        text: "Go back to dashboard",
        nextScene: "dashboard"
      }
    ]
  },

  youtube: {
    title: "YouTube",
    text: "Welcome to YouTube—you’ve probably been here before. It’s a platform where creators share content to all the viewers out there. Keeping that in mind, there is a possibility that there’s a user using it as a cloud storage program. Your code may be linked under a video; maybe it links back to GitHub.",
    choices: [
      {
        text: "Investigate videos titled similarly to your project's name's descriptions.",
        action: function () {
          updateHealth(-10)
        },
        nextScene: "b"
      },
      {
        text: "Watch an unrelated relaxing video (only once)",
        action: function () {
          if (!hpBoostUsed) {
            updateHealth(30);
            hpBoostUsed = true;
          }
          else {
            updateHealth(-35);
          }
        },
        nextScene: "b"
      },
      {
        text: "Go back to dashboard",
        nextScene: "dashboard"
      },
    ]
  },

   reddit: {
    title: "Reddit",
    text: "Reddit is a platform with a lot of different subreddits. Users do all kinds of things on Reddit and one of those things may be posting leaks so go check it out.",
    choices: [
      {
        text: "Search subreddits you find suspicious",
        nextScene: "a"
      },
      {
        text: "Go back to dashboard",
        nextScene: "dashboard"
      }
    ]
  },

   gdrive: {
    title: "Google Drive",
    text: "People use Google Drive to store files and there’s a chance your leaked files are also stored on there. You can check public folders to see if any of your files are stored in them.",
    choices: [
      {
        text: "Look through the Google Drive links you've retrieved from the fellow developer",
        action: function () {
          updateHealth(-10);
        },
        nextScene: "a"
      },
      {
        text: "Download and play a game",
        action: function () {
          updateHealth(10);
        },
        nextScene: "a"
      },
      {
        text: "Go back to dashboard",
        nextScene: "dashboard"
      }
    ]
  },

  mediafire: {
    title: "MediaFire",
    text: "MediaFire is pretty similar to Google Drive in a way where you can store files on both, except MediaFire is primarily used for sharing files. Since it’s mostly used for sharing files, you can scan through links to see whether or not any downloads on there matches your project’s name.",
    choices: [
      {
        text: "Download random archives you think might be your leaked code",
        action: function () {
          updateHealth(-10);
        },
        nextScene: "a"
      },
      {
        text: "Go back to dashboard",
        nextScene: "dashboard"
      }
    ]
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// variable to check if player used health boost
let hpBoostUsed = false;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function fileClaim() {
  if (inventory.includes("leak")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "You haven't found the leak yet!";
  }
}

function redditUnblock() {
  if (inventory.includes("Reddit unblocked")) {
    updateScene("reddit");
  } else {
    messageDisplay.textContent = "Reddit is blocked on your network.";
  }
}

function gDriveInfo() {
  if (inventory.includes("Google Drive links")) {
    updateScene("gdrive");
  } else {
    messageDisplay.textContent = "Try searching for public Google Drive links.";
  }  
}

function mediaFireInfo() {
  if (inventory.includes("MediaFire links")) {
    updateScene("mediafire");
  } else {
    messageDisplay.textContent = "Try searching for public MediaFire links.";
  } 
}

function playGame() {
  if (inventory.includes("MediaFire links")) {
    updateScene("mediafire");
  } else {
    messageDisplay.textContent = "Try searching for public MediaFire links.";
  } 
}
