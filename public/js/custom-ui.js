



const bell = document.querySelector('.btn-notification'),
 setting = document.querySelector('.btn-settings'),
 panel_not = document.querySelector('#panel-notification'),
 panel_set = document.querySelector('#panel-settings'),
 parent_panels = document.querySelectorAll('#sub-menu'),
 child_panels = document.querySelectorAll('.sub-panel'),
 container = document.querySelector('.container'),
 swipe_btn = document.querySelector('#swipe'),
 search_btn = document.querySelector('.search'),
 swipe_panel = document.querySelector('#menu-panel'),
 swipeForm = document.querySelector('#updateForm'),
 loadPassForm = document.querySelectorAll('#loadForm'),
 alert        = document.querySelector('.alert'),
 fb  = document.querySelector('#fb'),
 google = document.querySelector('#google'),
 uploadInput = document.querySelector('[name="profilePic"]');


let panel_on = false;
let set_on = false;

let showPanel = () => {
  if(!panel_on){
    panel_not.style.transform = "translateX(0)";
    panel_on = !panel_on;
  }else{
    panel_not.style.transform = "translateX(100%)";
    panel_on = !panel_on;
  }

};

let showSettings = (e) => {
  e.preventDefault();
  if(!set_on){
    panel_set.style.transform = "scale(1)";
    if(bell) bell.style.display = "none";
    set_on = !set_on;
  }else{
    panel_set.style.transform = "scale(0)";
    if(bell) bell.style.display = "block";
    set_on = !set_on;
  }
};

function toggleSubMenu(){
  const sub = this.querySelector('.sub-panel');
  //remove sh-panel from other panels
  child_panels.forEach(childPanel => {
      if(sub !== childPanel){
        if(childPanel.classList.contains('sh-panel')){
          childPanel.classList.remove('sh-panel');
        }
      }
  });

  sub.classList.toggle('sh-panel');
}



if(bell) bell.addEventListener('click',showPanel);
if(setting) setting.addEventListener('click',showSettings);
if(parent_panels) parent_panels.forEach(parent_panel => parent_panel.addEventListener('click',toggleSubMenu));

if(container){

    container.addEventListener('click',() => {
      child_panels.forEach(childPanel => {
          if(childPanel.classList.contains('sh-panel')){
            childPanel.classList.remove('sh-panel');
          }else{
            return;
          }
      });
    });

}


if(swipe_btn){

  swipeForm.addEventListener('click',(e)=>{
      if(e.target.classList.contains('btn-save')) update_user();
      if(!e.target.classList.contains('swipe_btn')) return;
      e.preventDefault();
      swipeForm.classList.toggle('swipe');
      swipe_panel.classList.toggle('index');
  });

  

}


// loading html with ajax

function loadHTML(e){
  e.preventDefault();


  var html = `
              <button id="swipe" class="bg-btn hidden-lg-up swipe_btn" style="font-size:1em; float:left;"><i class="fa fa-align-right swipe_btn"></i></button>
              <div class="row" style="clear:both;">
                  <div class="col-12 col-md-10 mx-auto mb-3">
                      <div id="flash" class="my-2"></div>
                      <input type="passwod" name="oldPassword" value="" placeholder="Old Password" class="form-control">

                      <input type="password" name="newPassword" value="" placeholder="New Password" class="form-control">

                      <input type="password" name="confirmPassword" value="" placeholder="Confirm Password" class="form-control">

                      <button type="button" class="bg-btn btn-save" name="button" style="width:100%;font-size:0.9em;">Change Password</button>
                  </div>
                  <div class="col-12 col-md-10 mx-auto mt-3 py-5" style="border-top:1px solid #dcdcdc;">
                      <p class="lead">I want to delete my account and all the details right now.</p>
                      <button type="delete" name="button" class="btn bg-btn btn-dlt">Delete my Account</button>
                  </div>
              </div>`;


  if(e.target.dataset.get == "infoForm"){
    var data = JSON.parse(e.target.dataset.user);
    
    html    = `  <button id="swipe" class="bg-btn hidden-lg-up swipe_btn" style="font-size:1em; float:left;"><i class="fa fa-align-right swipe_btn"></i></button>
                  <div class="row" style="clear:both;">
                    <div class="col-12 col-md-4" style="text-align:center">
                        <img src="${data.image}" alt="" class="img-fluid">
                    </div>
                    <div class="col-12 col-md-8">
                        <span>${data.fullname}</span>
                        <b>@${data.username}</b>
                        <p class="lead">${data.bio}</p>
                    </div>
                    <div class="col-11 col-md-12 mx-auto">
                        <div id="flash" class="my-2"></div>
                        <input type="text" name="fullname" value="${data.fullname}" placeholder="fullname" class="form-control">

                        <input type="text" name="username" value="${data.username}" placeholder="username" class="form-control">

                        <textarea name="bio" class="form-control" placeholder="password" maxlength="120">${data.bio}</textarea>

                        <button type="button" class="bg-btn btn-save" name="button">Save</button>
                    </div>
                   </div>`;
  }

  
  swipeForm.innerHTML = html;

}

if(loadPassForm) loadPassForm.forEach(loadBtn => loadBtn.addEventListener('click',loadHTML));
if(fb) fb.addEventListener('click',() => {
  window.location.href = "/auth/facebook";
});

if(google) google.addEventListener('click',() => {
  window.location.href = "/auth/google";
});



