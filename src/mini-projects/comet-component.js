
"use client";
import React, { useEffect, useRef, useState } from "react";
import { eventEmitter } from "@/components/events";
import { ST } from "next/dist/shared/lib/utils";

const MovingStars = (params) => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const click = useRef(true);
  const bigStar = useRef(null);

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const STAR_DENSITY = useRef(5 * 10e7);
  const GRAVITATIONAL_CONSTANT = 6.6743e-11;
  const STAR_COUNT =  50;
  const MAX_STAR_RADIUS = 10;
  const MIN_STAR_RADIUS = 1;
  const MAX_STAR_VELOCITY = 1.25;
  const MIN_STAR_VELOCITY = -1.25;
  const COMET_SPEED = 2.5;
  const MAX_COMET_RADIUS = 4;
  const COMET_FRICTION = 0.995;
  const TAIL_LENGTH_FACTOR = 5;
  const TAIL_FALLOFF_SPEED = 0.3;
  const maxTailLength = 50;

  let lastStarTime = 0;
  let top = 0;

  const [bigStarRadius, setBigStarRadius] = useState(15);


  useEffect(() => {
    const canvas = canvasRef.current;
    const canvas2 = canvasRef2.current;
    const parent = canvas.parentElement;

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    canvas2.width = parent.offsetWidth;
    canvas2.height = parent.offsetHeight;
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    const canvas2 = canvasRef2.current;
    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    // Set canvas dimensions to match the viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    // Array to hold the stars' positions and velocities
    let stars = [];

    // initalize a really big star
    stars.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 15,
      vx: 0,
      vy: 0,
      tailLength: 0,
      isFront: false,
      isBigStar: true,
    });

    const handleScroll = () => {
      const canvas = canvasRef.current;
      const canvas2 = canvasRef2.current;
      if (canvas) {
        // Calculate the distance scrolled vertically
        const scrollY = window.scrollY || window.pageYOffset;
        // Set the position of the canvas relative to the viewport
        canvas.style.top = `${scrollY}px`;
        canvas2.style.top = `${scrollY}px`;
  
        top = scrollY;
        if (scrollY > 0) {
          // if the user scrolls, get rid of the big star
          let oldStar = bigStar.current;
          bigStar.current.isBigStar = false;

          const interval = setInterval(() => {
            if (oldStar.radius > 10) {
              oldStar.radius -= 0.1;
            } else {
              clearInterval(interval);
            }
          }, 100);
        }
        // if the user scrolls back to the top, make a new big star
        if (scrollY === 0){
          // initalize a really big star
          let star = ({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 15,
            vx: 0,
            vy: 0,
            tailLength: 0,
            isFront: false,
            isBigStar: true,
          });
          bigStar.current = star
          stars.push(star)
        }
      }
      // when the user scrolls, get rid of the big star
      
    };

    bigStar.current = stars[0];

    // keep track of the mouse position, and make it a big star
    // const handleMouseMove = (e) => {
    //   const x = e.clientX;
    //   const y = e.clientY;
      
    // Function to generate a random number within a range
    const random = (min, max) => Math.random() * (max - min) + min;

    const randomLow = (min, max, lambda = 5) => {
      const u = Math.random();
      const randomValue = -Math.log(1 - u) / lambda;
      const scaledValue = Math.floor(randomValue * (max - min + 1));
      return Math.min(scaledValue, max - min) + min;
    };

    // Function to calculate the distance between two stars
    const distanceBetweenStars = (star1, star2) => {
      const dx = star2.x - star1.x;
      const dy = star2.y - star1.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Function to merge two stars
    const mergeStars = (star1, star2) => {
      if (!stars.includes(star2)) {
        // If star2 has already been merged, skip the merging process
        return;
      }

      const totalMass = star1.radius ** 3 + star2.radius ** 3;
      const totalMomentumX =
        star1.vx * star1.radius ** 3 + star2.vx * star2.radius ** 3;
      const totalMomentumY =
        star1.vy * star1.radius ** 3 + star2.vy * star2.radius ** 3;

      var mergedRadius = Math.cbrt(totalMass);

      // Determine the position of the merged star based on the larger star
      const largerStar = star1.radius >= star2.radius ? star1 : star2;
      const smallerStar = star1 === largerStar ? star2 : star1;
      // Set the properties of the merged star (star1)
      star1.radius = mergedRadius;
      star1.vx = totalMomentumX / mergedRadius ** 3;
      star1.vy = totalMomentumY / mergedRadius ** 3;
      star1.x = largerStar.x;
      star1.y = largerStar.y;
      if (star1.radius >= MAX_STAR_RADIUS) { // don't let stars get too big
        if (star1.isBigStar) { // then it's okay
          star1.radius = bigStarRadius;
        } 
        else {
          star1.radius = MAX_STAR_RADIUS;
        }
      }
      if (star1.radius >= MAX_STAR_RADIUS/2) { // don't let big stars go in front of text
        star1.isFront = false;
      }

      // Remove star2 from the stars array
      stars = stars.filter((star) => star !== smallerStar);
      addNewStar();
    };

    // Function to add a new star
    const addNewStar = () => {
      // check how many stars are on the screen
      if (stars.length > STAR_COUNT) {
        return;
      }
      const side = Math.floor(Math.random() * 4); // Randomly select a side (0-3) for star entry
      let x, y, vx, vy;

      switch (side) {
        case 0: // Top side
          x = random(0, canvas.width);
          y = -20;
          vx = random(MIN_STAR_VELOCITY, MAX_STAR_VELOCITY);
          vy = random(0, MAX_STAR_VELOCITY);
          break;
        case 1: // Right side
          x = canvas.width + 20;
          y = random(0, canvas.height);
          vx = random(MIN_STAR_VELOCITY, 0);
          vy = random(MIN_STAR_VELOCITY, MAX_STAR_VELOCITY);
          break;
        case 2: // Bottom side
          x = random(0, canvas.width);
          y = canvas.height + 20;
          vx = random(MIN_STAR_VELOCITY, MAX_STAR_VELOCITY);
          vy = random(MIN_STAR_VELOCITY, 0);
          break;
        case 3: // Left side
          x = -20;
          y = random(0, canvas.height);
          vx = random(0, MAX_STAR_VELOCITY);
          vy = random(MIN_STAR_VELOCITY, MAX_STAR_VELOCITY);
          break;
        default:
          break;
      }
      const tailLength = 0;
      stars.push({
        x,
        y,
        radius: randomLow(MIN_STAR_RADIUS, MAX_STAR_RADIUS),
        vx,
        vy,
        tailLength,
        isFront: random(0, 1) > 0.5,
      });
    };
    
    // Function to initialize stars
    const createStars = () => {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: random(0, canvas.width),
          y: random(0, canvas.height),
          radius: randomLow(MIN_STAR_RADIUS, MAX_STAR_RADIUS),
          vx: random(MIN_STAR_VELOCITY, MAX_STAR_VELOCITY),
          vy: random(MIN_STAR_VELOCITY, MAX_STAR_VELOCITY),
          isFront: random(0, 1) > 0.5,
        });
      }
    };

    // Function to draw stars on the canvas
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx2.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        if (!star.isFront) {
          ctx.beginPath();
          ctx.arc(star.x, star.y - top, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = "blue"; // "#0f90a1ee"
          ctx.fill();
          ctx.closePath();
        }
        else {
          ctx2.beginPath();
          ctx2.arc(star.x, star.y - top, star.radius, 0, Math.PI * 2);
          ctx2.fillStyle = "blue"; // "#0f90a1ee"
          ctx2.fill();
          ctx2.closePath();
        }
      });
    };

    // Function to update stars' positions and velocities
    const updateStars = () => {
      stars.forEach((star) => {
        if (star.isBigStar) {
          // move to the mouse position
          star.x = mouseX.current;
          star.y = mouseY.current;
          // set the size

        } else {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < -100 || star.x > canvas.width + 100) {
            stars = stars.filter((liststar) => liststar !== star);
            addNewStar();
          }

          if (star.y < -100 || star.y > canvas.height + 100) {
            stars = stars.filter((liststar) => liststar !== star);
            addNewStar();
          }

          const m1 =
            (4 / 3) * Math.PI * Math.pow(star.radius, 3) * STAR_DENSITY.current;
          stars.forEach((otherStar) => {
            if (star !== otherStar) {
              const r = distanceBetweenStars(star, otherStar);
              const m2 =
                (4 / 3) *
                Math.PI *
                Math.pow(otherStar.radius, 3) *
                STAR_DENSITY.current;
              const F = (GRAVITATIONAL_CONSTANT * (m1 * m2)) / r ** 2; // equation for gravity
              star.vx += (F * (otherStar.x - star.x)) / r / m1;
              star.vy += (F * (otherStar.y - star.y)) / r / m1;
            }
          });
        }
      });
      stars.forEach((star) => {
        stars.forEach((otherStar) => {
          if (star !== otherStar) {
            const r = distanceBetweenStars(star, otherStar);
            const combinedRadius = star.radius + otherStar.radius;

            // Check if the star is not currently in the process of merging
            if (r <= combinedRadius && !star.merging && !otherStar.merging) {
              mergeStars(star, otherStar);
              star.merging = true; // Set merging flag to true to prevent repeated merging
            }
          }
        });
      });
      stars.forEach((star) => {
        star.merging = false;
        const speed = Math.sqrt(star.vx ** 2 + star.vy ** 2);

        if (speed > COMET_SPEED - 0.25) {
          star.vx *= COMET_FRICTION;
          star.vy *= COMET_FRICTION;
        }
        if (speed > COMET_SPEED * 5) {
          // woah there man, slow down
          star.vx *= 0.7;
          star.vy *= 0.7;
        }

        if (speed > COMET_SPEED && star.radius <= MAX_COMET_RADIUS) {
          var tailLength = speed * TAIL_LENGTH_FACTOR + 3;
          star.tailLength = tailLength;
        }
        if (star.tailLength >= TAIL_FALLOFF_SPEED) {
          tailLength = star.tailLength;
          star.tailLength -= TAIL_FALLOFF_SPEED;

          // Calculate the normalized velocity vector of the star
          const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
          const normalizedVx = star.vx / speed;
          const normalizedVy = star.vy / speed;

          // Limit the tail length based on the speed of the star

          const limitedTailLength = Math.min(tailLength, maxTailLength);
          if (!star.isFront) {
          const gradient = ctx.createLinearGradient(
            star.x,
            star.y - top,
            star.x - limitedTailLength * normalizedVx,
            star.y - top - limitedTailLength * normalizedVy
          );

          gradient.addColorStop(0, "rgba(255, 165, 0, 1)"); // Orange
          gradient.addColorStop(0.5, "rgba(255, 69, 0, 0.8)"); // Reddish-orange
          gradient.addColorStop(1, "rgba(255, 0, 0, 0)"); // Transparent
          
            ctx.beginPath();
            ctx.moveTo(star.x, star.y - top);
            ctx.lineTo(
              star.x - limitedTailLength * normalizedVx,
              star.y - top - limitedTailLength * normalizedVy
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = star.radius * 2;
            ctx.stroke();
          }
          else {
            const gradient = ctx2.createLinearGradient(
              star.x,
              star.y - top,
              star.x - limitedTailLength * normalizedVx,
              star.y - top - limitedTailLength * normalizedVy
            );
  
            gradient.addColorStop(0, "rgba(255, 165, 0, 1)"); // Orange
            gradient.addColorStop(0.5, "rgba(255, 69, 0, 0.8)"); // Reddish-orange
            gradient.addColorStop(1, "rgba(255, 0, 0, 0)"); // Transparent
            ctx2.beginPath();
            ctx2.moveTo(star.x, star.y - top);
            ctx2.lineTo(
              star.x - limitedTailLength * normalizedVx,
              star.y - top - limitedTailLength * normalizedVy
            );
            ctx2.strokeStyle = gradient;
            ctx2.lineWidth = star.radius * 2;
            ctx2.stroke();
          
          }
        }
      });
    };

    // Animation loop
    const animate = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    

    createStars();
    animate();

    // Event listener to update canvas dimensions on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas2.width = window.innerWidth;
      canvas2.height = window.innerHeight;
      handleScroll();
      // window.location.reload();
    };

    

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('mousemove', function(e) {

      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    });
    // subscribe to the event emitter

    const unsubscribe = eventEmitter.subscribe('onHoverEvent', (data) => {
      // find the big star and make it invisible
      let oldStar = bigStar.current;
      bigStar.current.isBigStar = false;
      oldStar.radius = 1;
    });

    const unsubscribe2 = eventEmitter.subscribe('onHoverOutEvent', (data) => {
      // make the big star visible
      let star = ({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 15,
        vx: 0,
        vy: 0,
        tailLength: 0,
        isFront: false,
        isBigStar: true,
      });
      
      bigStar.current = star
      stars.push(star);
    });
      



    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      // unsubscribe from the eventEmitter
      unsubscribe();
      unsubscribe2();
      // remove all the stars
      stars = [];

    };
  }, [MIN_STAR_VELOCITY, lastStarTime, bigStarRadius]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1, pointerEvents: "none" }} />
      <canvas ref={canvasRef2} style={{ position: "absolute", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />
    </div>
    );
};

export default MovingStars;
