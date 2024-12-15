const canvas = document.getElementById("canvas");
const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const lineColor = document.getElementById("line-color");
const hourColor = document.getElementById("hour-color");
const minuteColor = document.getElementById("minute-color");
const secondColor = document.getElementById("second-color");

function clock() {
  const now = new Date();
  const ctx = canvas.getContext("2d");

  //Setup canvas
  ctx.save(); // Save the defualt state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 200); //Put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); // Rotate clock -90deg

  //Set defualt style
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#f4f4f4";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  //Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //Draw hour lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  //Draw minute lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(120, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  //Get current time
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  //console.log(`${hour}:${minute}:${second}`);

  //Draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hour + (Math.PI / 360) * minute + (Math.PI / 21600) * second
  );
  ctx.strokeStyle = hourColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  //Draw minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * minute + (Math.PI / 1800) * second);
  ctx.strokeStyle = minuteColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  //Draw second hand
  ctx.save();
  ctx.rotate((second * Math.PI) / 30);
  ctx.strokeStyle = secondColor.value;
  ctx.fillStyle = secondColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // Restore default state
  requestAnimationFrame(clock);
}
requestAnimationFrame(clock);

document.getElementById("save-btn").addEventListener("click", () => {
  const dataURL = canvas.toDataURL("img/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataURL;
  link.click();
});
