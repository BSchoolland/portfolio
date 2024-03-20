import React, { useEffect, useState, useRef } from "react";

function Simple2DPlatformer() {
  const messageRef = useRef(null);
  const guyRef = useRef(null);
  const platformsRef = useRef(null);
  const textBoxesRef = useRef(null);
  const [playerPosX, setPlayerPosX] = useState(400);
  const [playerPosY, setPlayerPosY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [touchingGround, setTouchingGround] = useState(false);

  const PlayerWidth = 50;
  const PlayerHeight = 75;

  const viewX = 1200;

  // Refs for player position and speed
  const playerPosXRef = useRef(400); // Initial player X position
  const playerPosYRef = useRef(0); // Initial player Y position
  const playerSpeedXRef = useRef(0); // Initial player speed on the X axis
  const playerSpeedYRef = useRef(0); // Initial player speed on the Y axis
  const fellRef = useRef(false); // Ref for tracking if the player has fallen off the screen
  // Ref for checking if the player is touching the ground
  const touchingGroundRef = useRef(false);

  // Ref for the current state of key presses
  const keysRef = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  // Refs for scrolling
  const scrollXRef = useRef(0); // Initial horizontal scroll position
  const scrollSpeedRef = useRef(0); // Initial scroll speed

  useEffect(() => {
    // Here, you'd include the code to start the game loop and handle other initial setup,
    // like adding event listeners for key presses.

    // Example of handling keydown events
    const handleKeyDown = (event) => {
      if (event.key in keysRef.current) {
        keysRef.current[event.key] = true;
      }
    };

    // Example of handling keyup events
    const handleKeyUp = (event) => {
      if (event.key in keysRef.current) {
        keysRef.current[event.key] = false;
      }
    };

    // Add event listeners for keydown and keyup
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    const player = guyRef.current;

    const leftImage = "images/guy-left.png";
    const rightImage = "images/guy-right.png";
    const runAcceleration = 2;
    const jumpPower = 6;
    const gravity = 0.2;
    const frictionX = 0.5;

    let platforms = [
      {
        x: 200,
        y: 200,
        width: 300,
        height: 50,
        color: "green",
        effect: "none",
      },
      {
        x: 700,
        y: 300,
        width: 300,
        height: 50,
        color: "green",
        effect: "none",
      },
      {
        x: 1150,
        y: 200,
        width: 500,
        height: 50,
        color: "green",
        effect: "none",
      },
      {
        x: 1400,
        y: 190,
        width: 100,
        height: 10,
        color: "red",
        effect: "kill",
      },
      {
        x: 1800,
        y: 300,
        width: 100,
        height: 50,
        color: "blue",
        effect: "launch",
      },
      {
        x: 2200,
        y: 100,
        width: 300,
        height: 50,
        color: "green",
      },
      {
        x: 2600,
        y: 50,
        width: 50,
        height: 50,
        color: "gold",
        effect: "win",
      },
    ];
    function arrowKeys() {
      const currentKeys = keysRef.current; // Assuming keysRef is initialized elsewhere with the current key states

      // handle arrow keys
      // do accelerations and friction
      if (currentKeys.ArrowLeft) {
        playerSpeedXRef.current -= runAcceleration;
        guyRef.current.src = leftImage; // Assuming guyRef is the ref to the player's image element
      }
      if (currentKeys.ArrowRight) {
        playerSpeedXRef.current += runAcceleration;
        guyRef.current.src = rightImage; // Assuming guyRef is the ref to the player's image element
      }
      if (currentKeys.ArrowUp) {
        if (touchingGroundRef.current) {
          // Assuming touchingGroundRef is a ref that tracks whether the player is touching the ground
          playerSpeedYRef.current = -jumpPower;
        } else {
          playerSpeedYRef.current -= gravity / 2;
        }
      }
      playerSpeedXRef.current *= frictionX;
      playerSpeedYRef.current += gravity;

      // Update position using refs for continuous updates
      playerPosXRef.current += playerSpeedXRef.current;
      playerPosYRef.current += playerSpeedYRef.current;
    }

    function collisionDetection() {
      touchingGroundRef.current = false; // Directly update ref instead of state

      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (
          playerPosXRef.current < platform.x + platform.width &&
          playerPosXRef.current + PlayerWidth > platform.x &&
          playerPosYRef.current < platform.y + platform.height &&
          playerPosYRef.current + PlayerHeight > platform.y
        ) {
          // console.log("collision detected");
          // collision detected!
          if (platform.effect === "kill") {
            // Directly manipulate the ref values
            playerPosXRef.current = 200;
            playerPosYRef.current = 0;
            playerSpeedXRef.current = 0;
            playerSpeedYRef.current = 0;
          } else if (platform.effect === "launch") {
            playerSpeedYRef.current = -10;
          } else if (platform.effect === "win") {
            alert("You beat the 2D platformer!");
            // go back to the start
            playerPosXRef.current = 200;
            playerPosYRef.current = 0;
          } else {
            // Adjust position and speed based on collision
            handlePlatformCollision(platform);
          }
        }
      }
    }

    function handlePlatformCollision(platform) {
      const lastPlayerPosY = playerPosYRef.current - playerSpeedYRef.current; // Calculate based on speed to simulate 'last position'
      const lastPlayerPosX = playerPosXRef.current - playerSpeedXRef.current;

      if (lastPlayerPosY + PlayerHeight <= platform.y) {
        playerPosYRef.current = platform.y - PlayerHeight;
        playerSpeedYRef.current = 0;
        touchingGroundRef.current = true;
      } else if (lastPlayerPosY >= platform.y + platform.height) {
        playerPosYRef.current = platform.y + platform.height;
        playerSpeedYRef.current = 0;
      } else if (lastPlayerPosX + PlayerWidth <= platform.x) {
        playerPosXRef.current = platform.x - PlayerWidth;
        playerSpeedXRef.current = 0;
      } else if (lastPlayerPosX >= platform.x + platform.width) {
        playerPosXRef.current = platform.x + platform.width;
        playerSpeedXRef.current = 0;
      }
    }

    function scrollScreen() {
      // Calculate the target position for scrolling, aiming to keep the player centered
      const scrollTarget = playerPosXRef.current - 200;
      // Check if the scroll adjustment is needed based on a minimum threshold
      if (Math.abs(scrollTarget - scrollXRef.current) > 25) {
        // Adjust the scroll speed towards the target, introducing an 'elastic' effect
        scrollSpeedRef.current += (scrollTarget - scrollXRef.current) / 100;
      }
      // Apply friction to the scroll speed to gradually stop scrolling
      scrollSpeedRef.current *= 0.9;
      // Update the scroll position based on the current speed
      scrollXRef.current += scrollSpeedRef.current;
    }

    function display() {
      // Assuming player, windowsize, viewX, PlayerWidth, and PlayerHeight are accessible in this context
      const windowsize = window.innerWidth;
      const ratio = windowsize / viewX;
      if (guyRef.current) {
        // Directly manipulate the DOM element using ref values
        guyRef.current.style.left =
          (playerPosXRef.current - scrollXRef.current) * ratio + "px";
        guyRef.current.style.top = playerPosYRef.current * ratio + "px";
        // Scale the player to the screen
        guyRef.current.style.width = PlayerWidth * ratio + "px";
        guyRef.current.style.height = PlayerHeight * ratio + "px";
      }

      // Display the platforms as rectangles
      if (platformsRef.current) {
        const container = platformsRef.current;
        container.innerHTML = ""; // Clear existing platforms (consider optimizing this for performance)
        platforms.forEach((platform) => {
          const div = document.createElement("div");
          div.className = "platform";
          div.style.position = "absolute";
          div.style.left = (platform.x - scrollXRef.current) * ratio + "px";
          div.style.top = platform.y * ratio + "px";
          div.style.width = platform.width * ratio + "px";
          div.style.height = platform.height * ratio + "px";
          div.style.backgroundColor = platform.color;
          container.appendChild(div);
        });
      }
    }

    function detectFall() {
      // detect if the player has fallen off the screen
      if (playerPosYRef.current > 400) {
        // play a sound
        if (!fellRef.current) {
          const audio = new Audio("sounds/mario-falling.mp3");
          audio.play();
          fellRef.current = true; // Directly modify ref value
        }
        // wait 2 seconds, then reset the player
        setTimeout(() => {
          // Directly manipulate the ref values for resetting the player
          playerPosXRef.current = 200;
          playerPosYRef.current = 0;
          playerSpeedXRef.current = 0;
          playerSpeedYRef.current = 0;
          fellRef.current = false; // Reset the fell ref
          // Ensure any necessary UI updates or side effects triggered by these changes are handled appropriately
        }, 1000);
      }
    }

    function gameLoop() {
      requestAnimationFrame(gameLoop);

      //playerPosX +=playerSpeedX;
      //playerPosY +=playerSpeedY;
      arrowKeys();
      // check for collision
      collisionDetection();
      // scroll the screen
      scrollScreen();

      // display the game
      display();

      // detect if the player has fallen off the screen
      detectFall();
    }

    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      mouseDown: false,
    };

    document.addEventListener("keydown", (event) => {
      if (event.key in keys) {
        keys[event.key] = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key in keys) {
        keys[event.key] = false;
      }
    });
    // make sure the page cannot be manually scrolled
    // document.body.style.overflow = "hidden";
    // make sure the page cannot be zoomed
    document.body.style.touchAction = "none";

    // start the game loop
    gameLoop();
    // cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="mini-project-box">
      <h1 style={{ color: "white" }} ref={messageRef}>
        Use the arrow keys to move
      </h1>

      <img
        ref={guyRef}
        src="images/guy-left.png"
        alt="Guy"
        width="75px"
        style={{ position: "absolute", left: "200px", top: "0px" }}
      />
      <div ref={platformsRef}></div>
      <div ref={textBoxesRef}></div>
    </div>
  );
}

export default Simple2DPlatformer;
