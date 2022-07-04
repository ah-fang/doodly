// loads the canvas upon loading the page
window.onload = () => {
  const canvas = document.getElementById("canvas");
  const saveButton = document.getElementById("save");
  const loadInput = document.getElementById("load");

  new Drawing(canvas, saveButton, loadInput);
};

// creates the drawing events
class Drawing {
  constructor(canvas, saveButton, loadInput) {
    this.isDrawing = false;

    // mouse down is when you click and mouseup is when you release
    canvas.addEventListener("mousedown", () => this.startDrawing());
    canvas.addEventListener("mousemove", (event) => this.draw(event));
    canvas.addEventListener("mouseup", () => this.stopDrawing());

    saveButton.addEventListener("click", () => this.save());
    loadInput.addEventListener("change", (event) => this.load(event));
    // rect aligns the cursor with the canvas
    const rect = canvas.getBoundingClientRect();

    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
  }
  // isDrawing defaults to false to prevent drawing without clicking
  startDrawing() {
    this.isDrawing = true;
  }
  stopDrawing() {
    this.isDrawing = false;
    // adding beginPath here allows you to disconnect the line when you release and start drawing in a new space 
    this.context.beginPath();
  }
  // this makes the drawing a continuous line
  draw(event) {
    if (this.isDrawing) {
      this.context.strokeStyle = "#000";
      this.context.lineJoin = "round";
      this.context.lineWidth = 1;
      this.context.lineTo(
        event.pageX - this.offsetLeft,
        event.pageY - this.offsetTop
      );
      this.context.closePath();
      this.context.stroke();
      this.context.moveTo(
        event.pageX - this.offsetLeft,
        event.pageY - this.offsetTop
      );
    }
  }
  // saves your image to your computer 
  save() {
    const data = this.canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = data;
    a.download = "image.png";
    a.click();
  }
  load(event) {
    const file = [...event.target.files].pop();
    this.readTheFile(file).then((image) => this.loadTheImage(image));
  }
  // places a chosen file to draw over
  loadTheImage(image) {
    const img = new Image();
    const canvas = this.canvas;
    img.onload = function () {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = image;
  }
  readTheFile(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
}
