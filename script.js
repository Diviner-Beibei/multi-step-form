const STEP_1 = ".step-block-1";
const STEP_2 = ".step-block-2";
const STEP_3 = ".step-block-3";
const STEP_4 = ".step-block-4";
const FINISH = ".finish-block";


const stepArr = document.querySelectorAll(".step");

const btnGroup = document.querySelector(".btn-group");
const planCardList = document.querySelector(".plan-card-list");
const toggleMonthYearBtn = document.querySelector(".toggle");

const additionalServiceList = document.querySelector(".additional-service-list");



let initalState = {
  statue: STEP_1,
  name: "",
  email: "",
  phoneNumber: "",
  selectedPlan: "arcade-plan",
  isYear: false,
  online_service: false,
  larger_storage: false,
  customizable_profile: false
}


/*************************STEP 1******************************** */

//initialization
initStep();

btnGroup.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains("next-step-btn")) {
    nextStep(initalState);
  }

  if (e.target.classList.contains("go-back-btn")) {
    goBack(initalState);
  }

  if (e.target.classList.contains("confirm-btn")) {
    nextStep(initalState);
  }
});

function getInputInfo(state) {
  const inputName = document.querySelector("#name");
  const inputEmail = document.querySelector("#email");
  const inputphoneNumber = document.querySelector("#phone-number");

  if (verifyInput(inputName, inputEmail, inputphoneNumber)) return false;

  state.name = inputName.value;
  state.email = inputEmail.value;
  state.phoneNumber = inputphoneNumber.value;
  return true;
}

function verifyInput(inputName, inputEmail, inputphoneNumber) {
  let invalid = false;
  if (!/\w{5,8}/g.test(inputName.value)) {
    invalid = true;
    switchInputStatue(inputName, inputName.value.length === 0 ? "empty" : "invalid", ".name-error-hint");
  } else {
    switchInputStatue(inputName, "valid", ".name-error-hint")
  }

  if (!/[a-z0-9]+@[a-z]+.[a-z]{2,3}/g.test(inputEmail.value)) {
    invalid = true;
    switchInputStatue(inputEmail, inputEmail.value.length === 0 ? "empty" : "invalid", ".email-error-hint");
  } else {
    switchInputStatue(inputEmail, "valid", ".email-error-hint")
  }

  if (!/\d{5,8}/g.test(inputphoneNumber.value)) {
    invalid = true;
    switchInputStatue(inputphoneNumber, inputphoneNumber.value.length === 0 ? "empty" : "invalid", ".phone-error-hint");
  } else {
    switchInputStatue(inputphoneNumber, "valid", ".phone-error-hint")
  }

  return invalid;
}

function switchInputStatue(input, operateType, error_hint_className) {
  const hint = document.querySelector(error_hint_className);

  console.log(hint, error_hint_className);
  // return;
  if (operateType === "valid") {
    input.classList.remove("input-error");
    hint.classList.add("visible");
    return;
  }

  let arr = error_hint_className.split('-');
  if (operateType === "empty") {
    hint.textContent = `Enter your ${arr[0].slice(1)}`;
  }
  if (operateType === "invalid") {
    hint.textContent = `Enter valid ${arr[0].slice(1)}`;
  }
  input.classList.add("input-error");
  hint.classList.remove("visible");
}

function nextStep(state) {
  if (state.statue === STEP_1) {
    if (!getInputInfo(initalState)) return;
    document.querySelector(".go-back-btn").classList.remove("visible");
  }

  // if (STEP_2 === state.statue) {
  //   return;
  // }

  switchStatue(state, 1);

  if (state.statue === STEP_3) {
    renderAdditionalService(initalState);
  }

  if (state.statue === STEP_4) {
    document.querySelector(".next-step-btn").classList.add("hidden");
    document.querySelector(".confirm-btn").classList.remove("hidden");
    renderConfirmBlock(initalState);
  }

  if (FINISH === state.statue) {
    btnGroup.classList.add("hidden");
  }
}

function goBack(state) {

  switchStatue(state, -1);

  if (state.statue === STEP_1) {
    document.querySelector(".go-back-btn").classList.add("visible");
  }

  if (state.statue === STEP_3) {
    document.querySelector(".next-step-btn").classList.remove("hidden");
    document.querySelector(".confirm-btn").classList.add("hidden");
  }
}

function switchStatue(state, operateNum) {
  const stepNum = Number(state.statue[state.statue.length - 1]);

  //Add hidden
  document.querySelector(state.statue).classList.toggle("hidden");

  //Add fill
  document.querySelector(`.step-${stepNum} .selector`).classList.toggle("fill");

  let className_1 = `.step-block-${stepNum + operateNum}`;
  let className_2 = `.step-${stepNum + operateNum} .selector`;
  if (stepNum + operateNum === 5) {
    className_1 = ".finish-block";
    className_2 = ".step-4 .selector";
  }

  //Remove hidden
  document.querySelector(className_1).classList.toggle("hidden");

  //Remove fill
  document.querySelector(className_2).classList.toggle("fill");

  state.statue = className_1;
  // console.log(className_1);
}

function initStep() {
  for (let i = 2; i < 5; i++) {
    document.querySelector(`.step-block-${i}`).classList.add("hidden");
  }

  document.querySelector(".step-1 .selector").classList.add("fill");

  document.querySelector(".finish-block").classList.add("hidden");
  //hidden go-back button
  document.querySelector(".go-back-btn").classList.add("visible");

  document.querySelector(".confirm-btn").classList.add("hidden");
}

/*************************STEP 2******************************** */

planCardList.addEventListener('click', function (e) {
  e.preventDefault();
  //Remove selected effect
  for (var i = 0; i < planCardList.children.length; i++) {
    planCardList.children[i].classList.remove("plan-card-selected");
  }

  //Add selected effect
  const node = e.target.closest(".plan-card");
  node.classList.add("plan-card-selected");

  if (node.classList.contains("arcade-plan")) {
    setSelectedPlan(initalState, "arcade-plan");
  }
  if (node.classList.contains("advance-plan")) {
    setSelectedPlan(initalState, "advance-plan");
  }
  if (node.classList.contains("pro-plan")) {
    setSelectedPlan(initalState, "pro-plan");
  }
});

function setSelectedPlan(state, plan) {
  state.selectedPlan = plan;
}

toggleMonthYearBtn.addEventListener('click', function (e) {
  e.preventDefault();
  toggleMonthYearBtn.classList.toggle("toggle-year");
  document.querySelector(".monthly-plan-text").classList.toggle("toggle-text");
  document.querySelector(".yearly-plan-text").classList.toggle("toggle-text");

  document.querySelectorAll(".plan-discounts").forEach(e => e.classList.toggle("hidden"))

  let monthPriceArr = [9, 12, 15];
  let yearPriceArr = [90, 120, 150];

  initalState.isYear = !document.querySelector(".yearly-plan-text").classList.contains("toggle-text");
  document.querySelectorAll(".plan-price").forEach((e, i) => {
    e.textContent = initalState.isYear ? `$${yearPriceArr[i]}/yr` : `$${monthPriceArr[i]}/mo`;
  });
})

/*************************STEP 3******************************** */

additionalServiceList.addEventListener('click', function (e) {
  e.preventDefault();

  //Add selected effect
  const node = e.target.closest(".additional-service-card");
  node.classList.toggle("plan-card-selected");
  const checkbox = node.querySelector("input[type='checkbox']");
  checkbox.checked = !checkbox.checked;
  // checkbox.setAttribute("checked", !checkbox.checked);
  // console.log(checkbox, checkbox.checked, checkbox.name);

  const key = checkbox.name.split('-').join('_');

  initalState[key] = checkbox.checked;
  console.log(initalState);
});

function renderAdditionalService(state) {
  console.log(state);
  let monthlyArr = [1, 2, 2];
  let yearlyArr = [10, 20, 20];
  document.querySelectorAll(".service-price").forEach((e, i) => {
    e.textContent = state.isYear ? `+$${yearlyArr[i]}/yr` : `+$${monthlyArr[i]}/mo`;
  })
}

/*************************STEP 4******************************** */

function renderConfirmBlock(state) {
  let plan = state.selectedPlan.split('-')[0];
  plan = plan.replace(plan[0], plan[0].toUpperCase());


  const planNameNode = document.querySelector(".selected-plan-name");
  const planPriceNode = document.querySelector(".selected-plan-price");

  console.log(plan, state);

  planNameNode.textContent = `${plan}(${state.isYear ? "Yearly" : "Monthly"})`;


  let planPrice = getPlanPrice(plan, state.isYear);
  planPriceNode.textContent = `$${planPrice}/${state.isYear ? "yr" : "mo"}`;

  insertServiceHtml(state);

  const totalPriceNode = document.querySelector(".total-price");

  planPrice += state.online_service ? (state.isYear ? 10 : 1) : 0;
  planPrice += state.larger_storage ? (state.isYear ? 20 : 2) : 0;
  planPrice += state.customizable_profile ? (state.isYear ? 20 : 2) : 0;

  totalPriceNode.textContent = `+$${planPrice}/${state.isYear ? "yr" : "mo"}`;
}

function getPlanPrice(plan, isYear) {
  switch (plan) {
    case "Arcade": return isYear ? 90 : 9;
    case "Advance": return isYear ? 120 : 12;
    case "Pro": return isYear ? 150 : 15;
    default: return 0;
  }
}

function insertServiceHtml(state) {
  const overviewData = document.querySelector(".overview-data");

  overviewData.querySelectorAll(".service-insert-html").forEach(e => {
    console.log(e);
    e.parentNode.removeChild(e);
  });

  const online_service_html = `
  <div class="flex-group service-insert-html">
    <p class="selected-service-name">Online service</p>
    <p class="selected-service-price">+$${state.isYear ? `10/yr` : `1/mo`}</p>
  </div>
`;

  const larger_storage_html = `
  <div class="flex-group service-insert-html">
    <p class="selected-service-name">Larger storage</p>
    <p class="selected-service-price">+$${state.isYear ? `20/yr` : `2/mo`}</p>
  </div>
`;

  const customizable_profile_html = `
  <div class="flex-group service-insert-html">
    <p class="selected-service-name">Customizable profile</p>
    <p class="selected-service-price">+$${state.isYear ? `20/yr` : `2/mo`}</p>
  </div>
`;

  if (state.online_service)
    overviewData.insertAdjacentHTML('beforeend', online_service_html);
  if (state.larger_storage)
    overviewData.insertAdjacentHTML('beforeend', larger_storage_html);
  if (state.customizable_profile)
    overviewData.insertAdjacentHTML('beforeend', customizable_profile_html);
}