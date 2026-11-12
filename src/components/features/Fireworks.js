'use client';

import React, { useState, useRef } from "react";
import Sketch from "react-p5";

const Fireworks = () => {
  const fireworks = useRef([]);
  const gravity = useRef(null);

  // Particle class
  class Particle {
    constructor(p5, x, y, firework) {
      this.p5 = p5;
      this.pos = p5.createVector(x, y);
      this.lifespan = 255;
      this.firework = firework;
      this.color = [p5.random(70, 255), p5.random(70, 255), p5.random(70, 255)];
      if (firework) {
        this.vel = p5.createVector(0, p5.random(-14, -12));
      } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(p5.random(2, 12));
      }
      this.acc = p5.createVector(0, 0);
    }

    applyForce(force) {
      this.acc.add(force);
    }

    update() {
      if (!this.firework) {
        this.vel.mult(0.85);
        this.lifespan -= this.p5.random(3, 5);
      }
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    show() {
      if (!this.firework) {
        this.p5.stroke(this.color[0], this.color[1], this.color[2], this.lifespan);
        this.p5.strokeWeight(2);
      } else {
        this.p5.stroke(255);
        this.p5.strokeWeight(4);
      }
      this.p5.point(this.pos.x, this.pos.y);
    }
  }

  // Firework class
  class Firework {
    constructor(p5) {
      this.p5 = p5;
      this.firework = new Particle(p5, p5.random(30, p5.width), p5.height, true);
      this.exploded = false;
      this.particles = [];
      this.done = false;
    }

    explode() {
      for (let i = 0; i < this.p5.random(100, 300); i++) {
        const p = new Particle(this.p5, this.firework.pos.x, this.firework.pos.y, false);
        this.particles.push(p);
      }
    }

    update() {
      if (!this.exploded) {
        this.firework.applyForce(gravity.current);
        this.firework.update();
        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          this.explode();
        }
      } else {
        if (this.particles.length === 0) this.done = true;
        for (let i = this.particles.length - 1; i >= 0; i--) {
          if (this.particles[i].lifespan < 1) {
            this.particles.splice(i, 1);
          } else {
            this.particles[i].applyForce(gravity.current);
            this.particles[i].update();
          }
        }
      }
    }

    show() {
      if (!this.exploded) {
        this.firework.show();
      } else {
        this.particles.forEach(p => p.show());
      }
    }
  }

  // p5 setup
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1000, 1000).parent(canvasParentRef);
    gravity.current = p5.createVector(0, 0.16);
    fireworks.current.push(new Firework(p5));
    p5.stroke(255);
    p5.strokeWeight(4);
  };

  // p5 draw loop
  const draw = (p5) => {
    p5.background(0, 80);

    if (p5.frameCount % 35 === 0) {
      fireworks.current.push(new Firework(p5));
    }

    for (let i = fireworks.current.length - 1; i >= 0; i--) {
      const fw = fireworks.current[i];
      if (fw.done) {
        fireworks.current.splice(i, 1);
      } else {
        fw.update();
        fw.show();
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Fireworks;
