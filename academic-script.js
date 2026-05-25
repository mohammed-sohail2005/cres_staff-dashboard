/**
 * Academic Management Dashboard Script
 * Core logic for Attendance, Timetable, Lesson Plan, and Results
 */

// ===== Mock Data =====
const STUDENTS = [
  { id: '2021BCS01', name: 'Deepak Kumar', attendance: 85, marks: 78 },
  { id: '2021BCS02', name: 'Bhavya Sri', attendance: 92, marks: 88 },
  { id: '2021BCS03', name: 'Arun Raj', attendance: 76, marks: 65 },
  { id: '2021BCS04', name: 'Eswar Mani', attendance: 95, marks: 92 },
  { id: '2021BCS05', name: 'Fardeen Khan', attendance: 88, marks: 74 },
  { id: '2021BCS06', name: 'Gayathri P', attendance: 90, marks: 82 },
  { id: '2021BCS07', name: 'Hari Prasad', attendance: 82, marks: 70 },
  { id: '2021BCS08', name: 'Ibrahim S', attendance: 93, marks: 85 }
];

const TIMETABLE = {
  'MON': [
    { time: '09:00', sub: 'DS', room: 'L201', active: true },
    { time: '10:00', sub: 'OS', room: 'L203', active: false },
    { time: '11:00', sub: 'MATHS', room: 'L105', active: false },
    { time: '13:00', sub: 'DBMS', room: 'LAB 1', active: false },
    { time: '14:00', sub: 'DBMS', room: 'LAB 1', active: false }
  ],
  'TUE': [
    { time: '09:00', sub: 'OS', room: 'L203', active: false },
    { time: '10:00', sub: 'DS', room: 'L201', active: false },
    { time: '11:00', sub: 'HCI', room: 'L302', active: false },
    { time: '13:00', sub: 'PROJ', room: 'DH', active: false }
  ]
};

const SYLLABUS = [
  { id: 1, title: 'Introduction to Operating Systems', completed: true },
  { id: 2, title: 'Process Management and Scheduling', completed: true },
  { id: 3, title: 'Memory Management Strategies', completed: false },
  { id: 4, title: 'File System Implementation', completed: false },
  { id: 5, title: 'Security and Protection', completed: false }
];

// ===== Role State =====
let currentRole = 'ca'; // 'ca' | 'cf'

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
  renderAttendance('att-tbody');
  renderTimetable('timetable-grid');
  renderSyllabus('topic-list');
  initTooltips();
  
  // Sidebar navigation logic
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section-content');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      
      // Update sidebar
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      
      // Close sidebar on mobile
      closeSidebarOnMobile();
      
      // For dashboard, show correct role view
      if (targetId === 'dashboard') {
        sections.forEach(sec => sec.style.display = 'none');
        const activeId = currentRole === 'ca' ? 'dashboard' : 'dashboard-cf';
        document.getElementById(activeId).style.display = 'block';
      } else {
        sections.forEach(sec => {
          sec.style.display = sec.id === targetId ? 'block' : 'none';
        });
      }
      
      // showToast(`Switched to ${item.innerText.trim()}`, 'info'); // Removed as per user request
    });
  });
});

// ===== Role Switcher =====
function switchRole(role) {
  currentRole = role;
  const sections = document.querySelectorAll('.section-content');
  const btnCA = document.getElementById('btn-ca');
  const btnCF = document.getElementById('btn-cf');
  const banner = document.getElementById('role-context-banner');
  const bannerIcon = document.getElementById('banner-icon');
  const bannerLabel = document.getElementById('banner-label');
  const bannerClass = document.getElementById('banner-class');
  const bannerTag = document.getElementById('banner-tag');
  const userRoleLabel = document.getElementById('user-role-label');

  // Hide all sections first
  sections.forEach(sec => sec.style.display = 'none');

  if (role === 'ca') {
    // Activate CA button
    btnCA.classList.add('active');
    btnCA.classList.remove('cf-active');
    btnCF.classList.remove('active');

    // Update banner
    banner.classList.remove('cf-mode');
    bannerIcon.innerHTML = '<i class="fas fa-user-shield"></i>';
    bannerLabel.textContent = 'Class Advisor';
    bannerClass.innerHTML = 'AI&DS &mdash; Section A &nbsp;&middot;&nbsp; Batch 2022&ndash;26 &nbsp;&middot;&nbsp; 64 Students';
    bannerTag.textContent = 'CA View';
    userRoleLabel.textContent = 'Class Advisor · AI&DS-A';

    // Show CA dashboard
    document.getElementById('dashboard').style.display = 'block';

    // Re-activate sidebar Dashboard link
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item[href="#dashboard"]').classList.add('active');

    // showToast('Switched to Class Advisor view — AI&DS Section A', 'info'); // Removed
  } else {
    // Activate CF button
    btnCF.classList.add('active', 'cf-active');
    btnCA.classList.remove('active');

    // Update banner
    banner.classList.add('cf-mode');
    bannerIcon.innerHTML = '<i class="fas fa-chalkboard-teacher"></i>';
    bannerLabel.textContent = 'Course Faculty';
    bannerClass.innerHTML = 'Deep Learning (20AICS501) &nbsp;&middot;&nbsp; AI&DS &mdash; Section C &nbsp;&middot;&nbsp; 58 Students';
    bannerTag.textContent = 'CF View';
    userRoleLabel.textContent = 'Course Faculty · AI&DS-C';

    // Show CF dashboard
    document.getElementById('dashboard-cf').style.display = 'block';

    // Re-activate sidebar Dashboard link
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item[href="#dashboard"]').classList.add('active');

    // showToast('Switched to Course Faculty view — Deep Learning, AI&DS Section C', 'info'); // Removed
  }
}

// ===== Switch to a sidebar section (used by CF quick buttons) =====
function switchSection(sectionId) {
  const sections = document.querySelectorAll('.section-content');
  sections.forEach(sec => sec.style.display = 'none');
  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';

  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.getAttribute('href') === `#${sectionId}`);
  });

  // showToast(`Navigated to ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`, 'info'); // Removed
}



// ===== Attendance Logic =====
function renderAttendance(containerId) {
  const tbody = document.getElementById(containerId);
  if (!tbody) return;
  
  tbody.innerHTML = STUDENTS.map(s => `
    <tr>
      <td>${s.id}</td>
      <td><strong>${s.name}</strong></td>
      <td>
        <div style="display:flex; align-items:center; gap:10px">
          <div style="flex:1; height:8px; background:#eee; border-radius:10px; overflow:hidden">
            <div style="width:${s.attendance}%; height:100%; background:var(--primary)"></div>
          </div>
          <span>${s.attendance}%</span>
        </div>
      </td>
      <td><span class="badge ${s.marks >= 80 ? 'badge-success' : 'badge-warning'}">${s.marks}%</span></td>
      <td>
        <label class="switch">
          <input type="checkbox" checked class="att-check" data-id="${s.id}">
          <span class="slider"></span>
        </label>
      </td>
    </tr>
  `).join('');
}

function autoSuggestAttendance() {
  const checks = document.querySelectorAll('.att-check');
  checks.forEach(check => {
    // Basic logic: if they were present last hour, suggest present (90% chance)
    const random = Math.random();
    check.checked = random > 0.1;
  });
  // showToast('Attendance suggest based on previous hour', 'success'); // Removed as per request
}

// ===== Timetable Logic =====
function renderTimetable(containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
  
  let html = '<div></div>'; // Top left empty
  days.forEach(day => html += `<div class="time-label">${day}</div>`);
  
  times.forEach(time => {
    html += `<div class="time-label">${time}</div>`;
    days.forEach(day => {
      const slot = (TIMETABLE[day] || []).find(s => s.time === time);
      if (slot) {
        html += `
          <div class="timetable-cell ${slot.active ? 'active' : ''}">
            <span class="subject">${slot.sub}</span>
            <span class="room">${slot.room}</span>
          </div>
        `;
      } else {
        html += `<div class="timetable-cell"></div>`;
      }
    });
  });
  
  grid.innerHTML = html;
}

// ===== Syllabus/Lesson Plan Logic =====
function renderSyllabus(containerId) {
  const list = document.getElementById(containerId);
  if (!list) return;
  
  list.innerHTML = SYLLABUS.map(topic => `
    <div class="topic-item ${topic.completed ? 'completed' : ''}" onclick="toggleTopic(${topic.id})">
      <input type="checkbox" ${topic.completed ? 'checked' : ''}>
      <div>
        <h4 style="font-size:0.95rem; font-weight:600">${topic.title}</h4>
        <p style="font-size:0.8rem; color:var(--text-muted)">Unit ${topic.id} · Select and use markdown notes</p>
      </div>
      <i class="fas fa-chevron-right" style="margin-left:auto; color:var(--text-muted)"></i>
    </div>
  `).join('');
}

function toggleTopic(id) {
  const topic = SYLLABUS.find(t => t.id === id);
  if (topic) {
    topic.completed = !topic.completed;
    renderSyllabus('topic-list');
    showToast(`${topic.completed ? 'Completed' : 'Reset'} topic: ${topic.title}`, 'info');
  }
}

// ===== UI Utilities =====
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

function handleLeaveSubmit(e) {
  e.preventDefault();
  // showToast('Leave application submitted successfully!', 'success'); // Removed as per request
  e.target.reset();
}

function initTooltips() {
  // Can add basic tooltips here if needed
}

// ====================================================================
//  MARKS UPLOAD — Data & State
// ====================================================================

// Students per section
const STUDENTS_A = [
  { id: '2022AIDS001', name: 'Arun Kumar M' },
  { id: '2022AIDS002', name: 'Bhavya Sri R' },
  { id: '2022AIDS003', name: 'Deepak Raj S' },
  { id: '2022AIDS004', name: 'Eswar Mani K' },
  { id: '2022AIDS005', name: 'Fardeen Khan' },
  { id: '2022AIDS006', name: 'Gayathri P' },
  { id: '2022AIDS007', name: 'Hari Prasad V' },
  { id: '2022AIDS008', name: 'Ibrahim S' },
  { id: '2022AIDS009', name: 'Janani Devi' },
  { id: '2022AIDS010', name: 'Karthik Raja' },
  { id: '2022AIDS011', name: 'Lakshmi Priya' },
  { id: '2022AIDS012', name: 'Mohammed Arif' }
];

const STUDENTS_C = [
  { id: '2022AIDS051', name: 'Nithya Shree' },
  { id: '2022AIDS052', name: 'Omar Farooq' },
  { id: '2022AIDS053', name: 'Pooja Ramesh' },
  { id: '2022AIDS054', name: 'Qasim Ali' },
  { id: '2022AIDS055', name: 'Riya Menon' },
  { id: '2022AIDS056', name: 'Sathish Kumar' },
  { id: '2022AIDS057', name: 'Thenmozhi V' },
  { id: '2022AIDS058', name: 'Uday Shankar' },
  { id: '2022AIDS059', name: 'Varsha Nair' },
  { id: '2022AIDS060', name: 'Wajid Hussain' },
  { id: '2022AIDS061', name: 'Yamini K' },
  { id: '2022AIDS062', name: 'Zaheer Ahmed' }
];

// State: current ratio (internal:exam), e.g., [50, 50]
let marksRatio = [50, 50];

// marks store: { studentId: { cat1Int, cat1Exam, cat2Int, cat2Exam } }
let marksStore = {};

// ====================================================================
//  Ratio Utilities
// ====================================================================
function setRatio(btn, ratioStr) {
  // Update pill UI
  document.querySelectorAll('.ratio-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  const parts = ratioStr.split(':').map(Number);
  marksRatio = parts;
  
  // Sync custom inputs
  const intInput = document.getElementById('custom-int-input');
  const examInput = document.getElementById('custom-exam-input');
  if (intInput && examInput) {
    intInput.value = parts[0];
    examInput.value = parts[1];
  }

  updateRatioBar();
  updateMaxLabels();
  recomputeAllScores();
  showToast(`Ratio set to Internal ${parts[0]}% : Exam ${parts[1]}%`, 'info');
}

function applyCustomRatio() {
  const intInput = document.getElementById('custom-int-input');
  const examInput = document.getElementById('custom-exam-input');
  const internalVal = parseInt(intInput.value);

  if (isNaN(internalVal) || internalVal < 1 || internalVal > 99) {
    showToast('Please enter a valid internal percentage (1-99)', 'error');
    return;
  }

  const examVal = 100 - internalVal;
  examInput.value = examVal;

  marksRatio = [internalVal, examVal];
  
  // Deactivate fixed pills
  document.querySelectorAll('.ratio-pill').forEach(p => p.classList.remove('active'));

  updateRatioBar();
  updateMaxLabels();
  recomputeAllScores();
  showToast(`Custom Ratio Applied: ${internalVal}:${examVal}`, 'success');
}

// Auto-sync exam input when typing in internal (called from HTML oninput)
function syncCustomRatio() {
  const intInput = document.getElementById('custom-int-input');
  const examInput = document.getElementById('custom-exam-input');
  if (!intInput || !examInput) return;
  
  let val = parseInt(intInput.value);
  if (isNaN(val)) return;
  if (val > 100) { val = 100; intInput.value = 100; }
  if (val < 0) { val = 0; intInput.value = 0; }
  
  examInput.value = 100 - val;
}

function updateRatioBar() {
  const [intPct, examPct] = marksRatio;
  document.getElementById('ratio-bar-int').style.width = `${intPct}%`;
  document.getElementById('ratio-bar-exam').style.width = `${examPct}%`;
  document.getElementById('ratio-label-int').textContent = `${intPct}%`;
  document.getElementById('ratio-label-exam').textContent = `${examPct}%`;
}

function updateMaxLabels() {
  const [intPct, examPct] = marksRatio;
  ['cat1-int-max','cat2-int-max'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = `/${intPct}`;
  });
  ['cat1-exam-max','cat2-exam-max'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = `/${examPct}`;
  });
  // Update badge text
  const badge = document.getElementById('marks-badge-text');
  if (badge) {
    badge.innerHTML = `Ratio: ${marksRatio[0]}:${marksRatio[1]} &nbsp;|&nbsp; Max Internal: ${marksRatio[0]} &nbsp;|&nbsp; Max Exam: ${marksRatio[1]}`;
  }
}

// ====================================================================
//  Marks Table Rendering
// ====================================================================
function getActiveStudents() {
  const sec = document.getElementById('marks-section');
  return sec && sec.value === 'C' ? STUDENTS_C : STUDENTS_A;
}

function renderMarksTable() {
  const students = getActiveStudents();
  const tbody = document.getElementById('marks-tbody');
  if (!tbody) return;

  tbody.innerHTML = students.map(s => {
    const saved = marksStore[s.id] || {};
    return `
      <tr data-id="${s.id}">
        <td class="td-regno">${s.id}</td>
        <td class="td-name">${s.name}</td>

        <!-- CAT-1 Internal -->
        <td>
          <input type="number" min="0" max="${marksRatio[0]}"
            class="mark-input cat1-input"
            data-student="${s.id}" data-field="cat1Int"
            value="${saved.cat1Int ?? ''}"
            placeholder="${marksRatio[0]}"
            oninput="onMarkInput(this)"
            onblur="validateInput(this)">
        </td>
        <!-- CAT-1 Exam -->
        <td>
          <input type="number" min="0" max="${marksRatio[1]}"
            class="mark-input cat1-input"
            data-student="${s.id}" data-field="cat1Exam"
            value="${saved.cat1Exam ?? ''}"
            placeholder="${marksRatio[1]}"
            oninput="onMarkInput(this)"
            onblur="validateInput(this)">
        </td>
        <!-- CAT-1 Score -->
        <td><span id="score-cat1-${s.id}" class="score-cell score-empty">—</span></td>

        <!-- CAT-2 Internal -->
        <td>
          <input type="number" min="0" max="${marksRatio[0]}"
            class="mark-input cat2-input"
            data-student="${s.id}" data-field="cat2Int"
            value="${saved.cat2Int ?? ''}"
            placeholder="${marksRatio[0]}"
            oninput="onMarkInput(this)"
            onblur="validateInput(this)">
        </td>
        <!-- CAT-2 Exam -->
        <td>
          <input type="number" min="0" max="${marksRatio[1]}"
            class="mark-input cat2-input"
            data-student="${s.id}" data-field="cat2Exam"
            value="${saved.cat2Exam ?? ''}"
            placeholder="${marksRatio[1]}"
            oninput="onMarkInput(this)"
            onblur="validateInput(this)">
        </td>
        <!-- CAT-2 Score -->
        <td><span id="score-cat2-${s.id}" class="score-cell score-empty">—</span></td>

        <!-- Average -->
        <td class="avg-cell"><span id="avg-${s.id}" class="score-cell score-empty">—</span></td>

        <!-- Grade -->
        <td><span id="grade-${s.id}" class="grade-badge grade-NA">N/A</span></td>
      </tr>
    `;
  }).join('');

  // Recompute any already-saved values
  students.forEach(s => {
    if (marksStore[s.id]) computeStudentScore(s.id);
  });
  updateSummary();
}

// ====================================================================
//  Live Score Computation
// ====================================================================
function onMarkInput(input) {
  const sid = input.dataset.student;
  const field = input.dataset.field;
  const val = parseFloat(input.value);

  if (!marksStore[sid]) marksStore[sid] = {};
  marksStore[sid][field] = isNaN(val) ? null : val;

  computeStudentScore(sid);
  updateSummary();
}

function validateInput(input) {
  const max = parseFloat(input.max);
  const val = parseFloat(input.value);
  if (!isNaN(val) && val > max) {
    input.value = max;
    input.classList.add('error');
    setTimeout(() => input.classList.remove('error'), 600);
    const sid = input.dataset.student;
    marksStore[sid][input.dataset.field] = max;
    computeStudentScore(sid);
    updateSummary();
    showToast(`Max allowed is ${max}. Value clamped.`, 'error');
  }
}

function computeStudentScore(sid) {
  const data = marksStore[sid] || {};
  const [intW, examW] = marksRatio;

  // CAT-1 Score (out of 100)
  const cat1Score = computeCatScore(data.cat1Int, data.cat1Exam, intW, examW);
  // CAT-2 Score (out of 100)
  const cat2Score = computeCatScore(data.cat2Int, data.cat2Exam, intW, examW);

  renderScoreCell(`score-cat1-${sid}`, cat1Score);
  renderScoreCell(`score-cat2-${sid}`, cat2Score);

  // Average
  let avg = null;
  if (cat1Score !== null && cat2Score !== null) {
    avg = Math.round(((cat1Score + cat2Score) / 2) * 10) / 10;
  } else if (cat1Score !== null) {
    avg = cat1Score;
  } else if (cat2Score !== null) {
    avg = cat2Score;
  }

  const avgEl = document.getElementById(`avg-${sid}`);
  if (avgEl) {
    if (avg !== null) {
      avgEl.textContent = avg.toFixed(1);
      avgEl.className = `score-cell ${scoreClass(avg)}`;
    } else {
      avgEl.textContent = '—';
      avgEl.className = 'score-cell score-empty';
    }
  }

  // Grade
  const gradeEl = document.getElementById(`grade-${sid}`);
  if (gradeEl) {
    const g = getGrade(avg);
    gradeEl.textContent = g.label;
    gradeEl.className = `grade-badge ${g.cls}`;
  }
}

function computeCatScore(intMark, examMark, intW, examW) {
  // Normalise each component to percentage of its weight, then sum
  // intMark is out of intW, examMark is out of examW, total = 100
  if (intMark === null || intMark === undefined || intMark === '') return null;
  if (examMark === null || examMark === undefined || examMark === '') return null;
  const score = (parseFloat(intMark) / intW) * intW + (parseFloat(examMark) / examW) * examW;
  // Simply intMark + examMark since they're already scored out of ratio weights
  return Math.min(100, Math.round((parseFloat(intMark) + parseFloat(examMark)) * 10) / 10);
}

function renderScoreCell(id, score) {
  const el = document.getElementById(id);
  if (!el) return;
  if (score === null) {
    el.textContent = '—';
    el.className = 'score-cell score-empty';
  } else {
    el.textContent = score.toFixed(1);
    el.className = `score-cell ${scoreClass(score)}`;
  }
}

function scoreClass(score) {
  if (score >= 75) return 'score-high';
  if (score >= 50) return 'score-mid';
  return 'score-low';
}

function getGrade(avg) {
  if (avg === null) return { label: 'N/A', cls: 'grade-NA' };
  if (avg >= 90)   return { label: 'O',   cls: 'grade-O' };
  if (avg >= 80)   return { label: 'A+',  cls: 'grade-A' };
  if (avg >= 70)   return { label: 'A',   cls: 'grade-A' };
  if (avg >= 60)   return { label: 'B',   cls: 'grade-B' };
  if (avg >= 50)   return { label: 'C',   cls: 'grade-C' };
  return { label: 'F', cls: 'grade-F' };
}

function recomputeAllScores() {
  const students = getActiveStudents();
  // Refresh max attributes on inputs
  document.querySelectorAll('.mark-input.cat1-input').forEach((inp, i) => {
    const field = inp.dataset.field;
    inp.max = field === 'cat1Int' || field === 'cat2Int' ? marksRatio[0] : marksRatio[1];
    inp.placeholder = inp.max;
  });
  students.forEach(s => computeStudentScore(s.id));
  updateSummary();
}

// ====================================================================
//  Summary Stats
// ====================================================================
function updateSummary() {
  const students = getActiveStudents();
  let avgs = [];

  students.forEach(s => {
    const data = marksStore[s.id] || {};
    const cat1 = computeCatScore(data.cat1Int, data.cat1Exam, marksRatio[0], marksRatio[1]);
    const cat2 = computeCatScore(data.cat2Int, data.cat2Exam, marksRatio[0], marksRatio[1]);
    if (cat1 !== null && cat2 !== null) avgs.push((cat1 + cat2) / 2);
  });

  const total = students.length;
  const filled = avgs.length;
  const avg = filled ? (avgs.reduce((a, b) => a + b, 0) / filled).toFixed(1) : '—';
  const highest = filled ? Math.max(...avgs).toFixed(1) : '—';
  const lowest = filled ? Math.min(...avgs).toFixed(1) : '—';
  const passed = filled ? avgs.filter(v => v >= 50).length : '—';
  const failed = filled ? avgs.filter(v => v < 50).length : '—';

  document.getElementById('sum-total').textContent = total;
  document.getElementById('sum-avg').textContent = avg === '—' ? '—' : avg;
  document.getElementById('sum-highest').textContent = highest;
  document.getElementById('sum-lowest').textContent = lowest;
  document.getElementById('sum-passed').textContent = passed;
  document.getElementById('sum-failed').textContent = failed;
}

// ====================================================================
//  Config Change (subject / section swap)
// ====================================================================
function onMarksConfigChange() {
  marksStore = {}; // reset on section/subject change
  renderMarksTable();
  updateMaxLabels();
  updateSummary();
}

// ====================================================================
//  Utility Actions
// ====================================================================
function autoFillSampleMarks() {
  const students = getActiveStudents();
  students.forEach(s => {
    const randInt = (max) => Math.floor(Math.random() * (max * 0.4) + max * 0.5);
    marksStore[s.id] = {
      cat1Int:  Math.min(marksRatio[0], randInt(marksRatio[0])),
      cat1Exam: Math.min(marksRatio[1], randInt(marksRatio[1])),
      cat2Int:  Math.min(marksRatio[0], randInt(marksRatio[0])),
      cat2Exam: Math.min(marksRatio[1], randInt(marksRatio[1]))
    };
  });
  renderMarksTable();
  updateSummary();
  showToast('Sample marks filled for all students.', 'success');
}

function clearAllMarks() {
  marksStore = {};
  renderMarksTable();
  updateSummary();
  showToast('All marks cleared.', 'info');
}

function saveMarks() {
  const students = getActiveStudents();
  const filled = students.filter(s => marksStore[s.id] &&
    marksStore[s.id].cat1Int !== null && marksStore[s.id].cat1Exam !== null &&
    marksStore[s.id].cat2Int !== null && marksStore[s.id].cat2Exam !== null
  ).length;
  if (filled === 0) {
    showToast('No marks to save. Please enter marks first.', 'error');
    return;
  }
  showToast(`Marks saved for ${filled} of ${students.length} students!`, 'success');
}

function exportMarksCSV() {
  const students = getActiveStudents();
  const subject = document.getElementById('marks-subject').value;
  const section = document.getElementById('marks-section').value;
  const ratio = marksRatio.join(':');

  let csv = `Subject,${subject}\nSection,AI&DS-${section}\nRatio,${ratio}\n\n`;
  csv += `Reg No,Student Name,CAT1 Internal (/${marksRatio[0]}),CAT1 Exam (/${marksRatio[1]}),CAT1 Score (/100),CAT2 Internal (/${marksRatio[0]}),CAT2 Exam (/${marksRatio[1]}),CAT2 Score (/100),Average,Grade\n`;

  students.forEach(s => {
    const d = marksStore[s.id] || {};
    const c1 = computeCatScore(d.cat1Int, d.cat1Exam, marksRatio[0], marksRatio[1]);
    const c2 = computeCatScore(d.cat2Int, d.cat2Exam, marksRatio[0], marksRatio[1]);
    const avg = c1 !== null && c2 !== null ? ((c1 + c2) / 2).toFixed(1) : '';
    const grade = getGrade(avg !== '' ? parseFloat(avg) : null).label;
    csv += `${s.id},${s.name},${d.cat1Int ?? ''},${d.cat1Exam ?? ''},${c1 !== null ? c1.toFixed(1) : ''},${d.cat2Int ?? ''},${d.cat2Exam ?? ''},${c2 !== null ? c2.toFixed(1) : ''},${avg},${grade}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Marks_${subject}_Section${section}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('CSV exported successfully!', 'success');
}

// ====================================================================
//  Init Marks section on first navigation
// ====================================================================
(function patchNavForMarks() {
  // Wait for DOM, then override nav click to init marks table
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('href') === '#marks-upload') {
        item.addEventListener('click', () => {
          // Render marks table when section first shown
          setTimeout(() => {
            updateMaxLabels();
            renderMarksTable();
          }, 50);
        });
      }
    });
  });
})();

// ===== PROFILE EDIT MODAL =====
function openProfileModal() {
  const modal = document.getElementById('profileModal');
  modal.classList.add('active');
  
  // Load saved profile data from localStorage
  loadProfileData();
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  modal.classList.remove('active');
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

function loadProfileData() {
  const savedProfile = JSON.parse(localStorage.getItem('staffProfile')) || {};
  
  document.getElementById('firstName').value = savedProfile.firstName || 'Dr. Umer';
  document.getElementById('lastName').value = savedProfile.lastName || 'Basith G';
  document.getElementById('email').value = savedProfile.email || '';
  document.getElementById('phone').value = savedProfile.phone || '';
  document.getElementById('designation').value = savedProfile.designation || '';
  document.getElementById('department').value = savedProfile.department || 'AI&DS';
  document.getElementById('qualifications').value = savedProfile.qualifications || '';
  
  // Load profile photo
  if (savedProfile.photoData) {
    const avatarPreview = document.getElementById('avatarPreview');
    avatarPreview.innerHTML = `<img src="${savedProfile.photoData}" alt="Profile Photo">`;
  } else {
    const avatarPreview = document.getElementById('avatarPreview');
    const firstName = savedProfile.firstName || 'Dr';
    const lastName = savedProfile.lastName || 'U';
    const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    avatarPreview.textContent = initials;
  }
}

function previewPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showToast('File size must be less than 5MB', 'error');
    return;
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    showToast('Please upload an image file', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const imgData = e.target.result;
    const avatarPreview = document.getElementById('avatarPreview');
    avatarPreview.innerHTML = `<img src="${imgData}" alt="Profile Photo">`;
    
    // Store in session for saving
    document.getElementById('photoInput').dataset.photoData = imgData;
  };
  reader.readAsDataURL(file);
}

function clearPhoto() {
  document.getElementById('photoInput').value = '';
  const avatarPreview = document.getElementById('avatarPreview');
  const savedProfile = JSON.parse(localStorage.getItem('staffProfile')) || {};
  const firstName = savedProfile.firstName || 'Dr';
  const lastName = savedProfile.lastName || 'U';
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  avatarPreview.textContent = initials;
}

function saveProfile(event) {
  event.preventDefault();
  
  const profile = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    designation: document.getElementById('designation').value,
    department: document.getElementById('department').value,
    qualifications: document.getElementById('qualifications').value,
    photoData: document.getElementById('photoInput').dataset.photoData || 
               (JSON.parse(localStorage.getItem('staffProfile')) || {}).photoData
  };
  
  // Save to localStorage
  localStorage.setItem('staffProfile', JSON.stringify(profile));
  
  // Update UI
  const userNameElement = document.querySelector('.user-info > div:first-child p:first-child');
  if (userNameElement) {
    userNameElement.textContent = `${profile.firstName} ${profile.lastName}`;
  }
  
  // Update avatar initials
  const avatarImg = document.querySelector('.avatar-img');
  const initials = (profile.firstName.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
  
  if (profile.photoData) {
    avatarImg.innerHTML = `<img src="${profile.photoData}" alt="Profile Photo" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
  } else {
    avatarImg.textContent = initials;
  }
  
  showToast('Profile updated successfully!', 'success');
  closeProfileModal();
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('profileModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProfileModal();
      }
    });
  }
  
  // Load profile on page load
  const savedProfile = JSON.parse(localStorage.getItem('staffProfile'));
  if (savedProfile) {
    const userNameElement = document.querySelector('.user-info > div:first-child p:first-child');
    if (userNameElement) {
      userNameElement.textContent = `${savedProfile.firstName} ${savedProfile.lastName}`;
    }
    
    const avatarImg = document.querySelector('.avatar-img');
    if (savedProfile.photoData) {
      const initials = (savedProfile.firstName.charAt(0) + savedProfile.lastName.charAt(0)).toUpperCase();
      avatarImg.innerHTML = `<img src="${savedProfile.photoData}" alt="Profile Photo" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
      avatarImg.style.cursor = 'pointer';
      avatarImg.title = 'Click to edit profile';
    }
  }
});

// ===== MOBILE SIDEBAR TOGGLE =====
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.getElementById('hamburgerMenu');
  
  if (!sidebar) return;
  
  const isVisible = sidebar.style.transform !== 'translateX(-100%)';
  
  if (isVisible) {
    sidebar.style.transform = 'translateX(-100%)';
    hamburger.classList.remove('active');
  } else {
    sidebar.style.transform = 'translateX(0)';
    hamburger.classList.add('active');
  }
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 1024) {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.getElementById('hamburgerMenu');
    
    if (sidebar && hamburger) {
      sidebar.style.transform = 'translateX(-100%)';
      hamburger.classList.remove('active');
    }
  }
}

// Show hamburger on small screens
function updateResponsiveElements() {
  const hamburger = document.getElementById('hamburgerMenu');
  const sidebar = document.querySelector('.sidebar');
  
  if (window.innerWidth <= 1024) {
    if (hamburger) hamburger.style.display = 'flex';
    if (sidebar) sidebar.style.transform = 'translateX(-100%)';
  } else {
    if (hamburger) hamburger.style.display = 'none';
    if (hamburger) hamburger.classList.remove('active');
    if (sidebar) sidebar.style.transform = 'translateX(0)';
  }
}

// Handle window resize
window.addEventListener('resize', updateResponsiveElements);

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 1024) {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.getElementById('hamburgerMenu');
    
    if (sidebar && hamburger && 
        !sidebar.contains(e.target) && 
        !hamburger.contains(e.target) &&
        !e.target.closest('.sidebar')) {
      if (sidebar.style.transform !== 'translateX(-100%)') {
        sidebar.style.transform = 'translateX(-100%)';
        hamburger.classList.remove('active');
      }
    }
  }
});

// Initialize responsive elements on page load
window.addEventListener('load', updateResponsiveElements);
document.addEventListener('DOMContentLoaded', updateResponsiveElements);

