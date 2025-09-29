const app = document.getElementById('app');

let questions = [];
let state = {screen:'login',score:0,qIndex:0};

// โหลดข้อมูลจาก trivia.json
fetch('trivia.json')
  .then(res=>res.json())
  .then(data=>{
    questions = data;
    render();
  });

function render(){
  if(state.screen==='login'){
    app.innerHTML = `
      <h2>StarWars App - Login</h2>
      <div class="small">Email</div>
      <input id="email"/><br/>
      <div class="small">Password</div>
      <input id="pwd" type="password"/><br/>
      <div style="margin-top:10px">
        <button class="btn" onclick="goto('home')">Login (mock)</button>
      </div>
      <div style="margin-top:8px">
        <span class="link" onclick="goto('forgot_choice')">ลืมรหัสผ่าน?</span>
      </div>`;
  }
  else if(state.screen==='forgot_choice'){
    app.innerHTML = `
      <h2>ยืนยันตัวตน (Forgot Password)</h2>
      <div class="small">เลือกวิธี: ตอบคำถามแฟนพันธุ์แท้ หรือ ส่งอีเมล</div>
      <div style="margin-top:12px">
        <div class="btn" onclick="startTrivia()">Trivia</div>
        <div class="btn" style="background:#444;margin-left:10px" onclick="sendEmail()">ส่งลิงก์อีเมล</div>
      </div>
      <div style="margin-top:10px">
        <span class="link" onclick="goto('login')">กลับ</span>
      </div>`;
  }
  else if(state.screen==='trivia'){
    const q = questions[state.qIndex];
    app.innerHTML = `
      <h2>Trivia ${state.qIndex+1} / ${questions.length}</h2>
      <div class="small">${q.q}</div>
      <div id="opts"></div>
      <div style="margin-top:10px" class="small">ตอบถูก: ${state.score}</div>`;
    const optsDiv = document.getElementById('opts');
    q.options.forEach((o,i)=>{
      const d = document.createElement('div'); 
      d.className='option'; 
      d.innerText=o;
      d.onclick=()=>{ 
        if(i===q.answer){ state.score++; alert('ถูก'); } 
        else alert('ผิด'); 
        nextQ(); 
      };
      optsDiv.appendChild(d);
    });
  }
  else if(state.screen==='reset'){
    app.innerHTML = `
      <h2>ตั้งรหัสผ่านใหม่</h2>
      <div class="small">New Password</div>
      <input id="np"/><br/>
      <div class="small">Confirm</div>
      <input id="cp"/><br/>
      <div style="margin-top:12px">
        <button class="btn" onclick="submitReset()">ยืนยัน</button>
      </div>`;
  }
  else if(state.screen==='home'){
    app.innerHTML = `
      <h2>Home</h2>
      <div class="small">Welcome (mock)</div>
      <div style="margin-top:10px">
        <div class="btn" onclick="goto('news')">News</div>
        <div class="btn" style="background:#444;margin-left:8px" onclick="goto('profile')">Profile</div>
      </div>
      <div style="margin-top:10px">
        <span class="link" onclick="goto('forgot_choice')">ไปลอง Forgot flow อีกครั้ง</span>
      </div>`;
  }
  else if(state.screen==='news'){
    app.innerHTML = `
      <h2>News List</h2>
      <div class="small">(demo)</div>
      <div style="margin-top:12px">
        <div class="option" onclick="goto('home')">News 1 (back)</div>
      </div>`;
  } 
  else if(state.screen==='profile'){
    app.innerHTML = `
      <h2>Profile</h2>
      <div class="small">Edit profile (mock)</div>
      <div style="margin-top:12px">
        <div class="btn" onclick="goto('home')">Back</div>
      </div>`;
  }
}

function goto(s){ state.screen=s; render(); }
function startTrivia(){ state.screen='trivia'; state.score=0; state.qIndex=0; render(); }
function nextQ(){
  state.qIndex++;
  if(state.qIndex>=questions.length){
    if(state.score>=2){ alert('ผ่าน! ไปตั้งรหัสใหม่'); state.screen='reset'; }
    else { alert('ไม่ผ่าน ต้องส่งลิงก์รีเซ็ตทางอีเมล'); state.screen='login'; }
  }
  render();
}
function sendEmail(){ alert('ส่งลิงก์รีเซ็ตทางอีเมล (demo)'); goto('login'); }
function submitReset(){ alert('เปลี่ยนรหัสสำเร็จ (demo)'); goto('login'); }
