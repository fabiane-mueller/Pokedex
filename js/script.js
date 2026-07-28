function openDialogTab(tab) {
  let i;
  const dialogNavRef = document.getElementsByClassName("dialogTab");
  for (i = 0; i < dialogNavRef.length; i++) {
    dialogNavRef[i].style.display = "none";
  }
  const dialogContentRef = document.getElementById(tab);
  dialogContentRef.style.display = "block";



}