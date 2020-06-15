export const displayExpantion = function (self, styles) {
  let div = self.nextElementSibling;
  if (div) {
    while (true) {
      if (div.classList.contains(styles.Tab)) {
        break;
      } else {
        div = div.nextElementSibling;
      }
    }
    div.classList.toggle(styles.hidden);
  }
  self.classList.toggle(styles.Expansioned);
};

export const displayComment = {
  Comment: () => document.getElementById("Comment"),
  onOver: function (comment) {
    let div = this.Comment();
    div.style.display = "block";
    div.innerHTML = comment;
  },
  onOut: function () {
    let div = this.Comment();
    div.style.display = "none";
  },
};
