export const displayExpansion = function (
  self: Element,
  styles: { [k: string]: string }
) {
  let div = self.nextElementSibling;
  if (div != null) {
    while (true) {
      if (!div) break;

      if (div.classList.contains(styles.Tab)) {
        break;
      } else {
        div = div.nextElementSibling;
      }
    }
    div?.classList?.toggle(styles.hidden);
  }
  self.classList.toggle(styles.Expansioned);
};

export const displayComment = {
  Comment: () => document.getElementById("Comment"),
  onOver: function (comment: string) {
    const div = this.Comment();
    if (!div) throw "";

    div.style.display = "block";
    div.innerHTML = comment;
  },
  onOut: function () {
    const div = this.Comment();
    if (!div) throw "";

    div.style.display = "none";
  },
};
