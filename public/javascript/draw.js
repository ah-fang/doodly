window.onload = () => {
  const canvas = document.getElementById('canvas');
  const saveButton = document.getElementById('save');
  const loadInput = document.getElementById('load');

  new Drawing(canvas, saveButton, loadInput);
  document.querySelector("#save").addEventListener("click", saveBtnHandler);
  // document.querySelector(".delete-btn").addEventListener("click", deleteBtnHandler);
  document.querySelector("#clear").addEventListener("click", clearBtnHandler);
};

class Drawing {
  constructor(canvas, saveButton, loadInput) {
    this.isDrawing = false;

    canvas.addEventListener('mousedown', () => this.startDrawing());
    canvas.addEventListener('mousemove', (event) => this.draw(event));
    canvas.addEventListener('mouseup', () => this.stopDrawing());

    saveButton.addEventListener('click', () => this.save());
    loadInput.addEventListener('change', (event) => this.load(event));

    const rect = canvas.getBoundingClientRect();

    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }
  startDrawing() {
    this.isDrawing = true;
  }
  stopDrawing() {
    this.isDrawing = false;
  }
  draw(event) {
    if (this.isDrawing) {
      this.context.fillRect(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, 2, 2);
    }
  }
  save() {
    const data = this.canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = 'image.png';
    a.click();
  }
  load(event) {
    const file = [...event.target.files].pop();
    this.readTheFile(file)
      .then((image) => this.loadTheImage(image))
  }
  loadTheImage(image) {
    const img = new Image();
    const canvas = this.canvas;
    img.onload = function () {
      const context = canvas.getContext('2d');
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
    })
  }
}

const clearBtnHandler = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  console.log("the clear button was pressed");
}
const saveBtnHandler = async(event) => {
  //save the drawing to a url and send all its relevant info to db in post request
  event.preventDefault();
  //*******add method to give post a title*******
  const title = document.querySelector('input[name="post-title"]').value;
  const drawing_url = document.querySelector('.canvas').toDataURL;

  const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
          title, drawing_url
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if(response.ok) {
      document.location.replace('/dashboard');
      newPostBtn.setAttribute('style', 'display: block');
  } else {
      alert(response.statusText);
  }
}

const deleteBtnHandler = async(event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
  });

  if(response.ok) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height)
    document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
}

