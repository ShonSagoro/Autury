import React, { useEffect, useRef, useState } from "react";
import useKeyEval from "../context/KeyEvalContext";


export default function Diagram(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {keyEval} = useKeyEval();

  const hashMap: { [key: string]: DataAutomata } = {
    "q0-q1": {
      linesColor: "white",
      value: "S",
    },
    "q1-q2": {
      linesColor: "white",
      value: "S..Y",
    },
    "q2-q3": {
      linesColor: "white",
      value: "-",
    },
    "q3-q4": {
      linesColor: "white",
      value: "0",
    },
    "q4-q5": {
      linesColor: "white",
      value: "0",
    },
    "q5-q6": {
      linesColor: "white",
      value: "0",
    },
    "q6-q7": {
      linesColor: "white",
      value: "1..9",
    },
    "q7-q8": {
      linesColor: "white",
      value: "-",
    },
    "q8-q9": {
      linesColor: "white",
      value: "A..Z",
    },
    "q3-q10": {
      linesColor: "white",
      value: "1..9",
    },
    "q4-q11": {
      linesColor: "white",
      value: "1..9",
    },
    "q5-q12": {
      linesColor: "white",
      value: "1..9",
    },
    "q10-q11": {
      linesColor: "white",
      value: "0..9",
    },
    "q11-q12": {
      linesColor: "white",
      value: "0..9",
    },
    "q12-q7": {
      linesColor: "white",
      value: "0..9",
    },
  };

  const hashMapEval: { [key: string]: string } = {
    "q0": "white",
    "q1": "white",
    "q2": "white",
    "q3": "white",
    "q4": "white",
    "q5": "white",
    "q6": "white",
    "q7": "white",
    "q8": "white",
    "q9": "white",
    "q10": "white",
    "q11": "white",
    "q12": "white",    
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawCircle = (circle: Circle, color:string) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.fillStyle = "transparent";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      ctx.fillStyle = color;
      if (circle.message != "") {
        writeInCircles(circle.x, circle.y, circle.message, ctx);
      }
    };

    const writeInCircles = (
      x: number,
      y: number,
      messaje: string,
      ctx: CanvasRenderingContext2D
    ) => {
      ctx.font = "14px Roboto";
      ctx.textAlign = "center";
      ctx.fillText(messaje, x, y + 5);
    };

    const drawLine = (line: Line, data: DataAutomata, state_radius: number) => {
      ctx.beginPath();
      ctx.moveTo(line.x + state_radius, line.y);
      ctx.lineTo(line.x + state_radius + 100 / 2, line.y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = data.linesColor;
      ctx.stroke();

      ctx.fillStyle = data.linesColor;
      ctx.fillText(
        data.value,
        state_radius + 100 / 2 + line.middle_x + 25,
        line.y - 10
      );
      ctx.closePath();
    };

    const drawDiagonalLine = (
      line: Line,
      data: DataAutomata,
      state_radius: number,
      ang: number
    ) => {
      ctx.beginPath();

      const y = ang > 0 ? line.y + state_radius : line.y - state_radius;

      ctx.moveTo(line.x, y);
      ctx.lineTo(line.x + state_radius + 70, line.y + ang);
      ctx.lineWidth = 2;
      ctx.strokeStyle = data.linesColor;
      ctx.stroke();

      ctx.fillStyle = data.linesColor;

      const text_y = ang > 0 ? -40 : 10;
      const text_x =
        ang > 0
          ? state_radius + 55 + line.middle_x + 25
          : state_radius + 30 + line.middle_x + 25;

      ctx.fillText(data.value, text_x, line.y + ang + text_y);
      ctx.closePath();
    };

    const drawDiagram = () => {
      for (let i = 0; i < 10; i++) {
        const circle = {
          x: 50 + i * 100,
          y: 50 + 100,
          r: 25,
          message: "q" + i,
        };

        const line = {
          y: 50 + 100,
          x: 50 + i * 100,
          middle_x: (50 + i * 100 + 50 + (i - 1) * 100) / 2,
        };

        if (i < 4 || i > 6) {
          drawCircle(circle, hashMapEval[`q${i}`]);

          if (i != 9) {
            drawLine(line, hashMap[`q${i}-q${i + 1}`], circle.r);
        }
        
        if (i == 9) {
            const circle_final = {
                x: 50 + i * 100,
                y: 50 + 100,
                r: 20,
                message: "",
            };
          drawCircle(circle_final, hashMapEval[`q${i}`]);
          }
        if (i == 3) {
            drawDiagonalLine(line, hashMap[`q${i}-q${i + 7}`], circle.r, -75);
          }
        } else {
          drawCircle(circle, hashMapEval[`q${i}`]);
          drawLine(line, hashMap[`q${i}-q${i + 1}`], circle.r);
          const topCircle = {
            x: 50 + i * 100,
            y: 52,
            r: 25,
            message: "q" + (i + 6),
          };

          const topLine = {
            x: 50 + i * 100,
            y: 50,
            middle_x: (50 + i * 100 + (50 + (i - 1) * 100)) / 2,
          };

          if (i > 3 && i < 6) {
            drawDiagonalLine(line, hashMap[`q${i}-q${i + 7}`], circle.r, -75);
          }

          if (i != 6) {
            drawLine(topLine, hashMap[`q${i+6}-q${i+7}`], circle.r);
          }

          if (i == 6) {
            drawDiagonalLine(topLine, hashMap[`q${i+6}-q${i + 1}`], circle.r, 75);
          }
          drawCircle(topCircle, hashMapEval[`q${i+6}`]);
        }
      }
    };

    const checkDiagram =()=>{
        const checkError=keyEval?.split("-")
        if (checkError!= undefined && checkError[1]=="error") {
            hashMapEval[checkError[0]] = "red";
          }else if (keyEval!=undefined){
            hashMapEval[keyEval] = "green";
        }
    }
    checkDiagram();
    drawDiagram();
    
  }, [keyEval]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <canvas ref={canvasRef} width={1000} height={200}></canvas>
    </div>
  );
};

type DataAutomata = {
    linesColor: string;
    value: string;
  };
  
  type Line = {
    x: number;
    y: number;
    middle_x: number;
  };
  
  type Circle = {
    x: number;
    y: number;
    r: number;
    message: string;
  };
  