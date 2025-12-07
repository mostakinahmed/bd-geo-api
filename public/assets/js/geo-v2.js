const BASE_URL = "https://bdopenapi.vercel.app/api/geo";

const divisionSelect = document.getElementById("division-select");
const districtSelect = document.getElementById("district-select");
const upazilaSelect = document.getElementById("upazila-select");
const unionSelect = document.getElementById("union-select");
const apiEndpointDisplay = document.getElementById("api-endpoint-display");
const dataContainer = document.getElementById("data-container");

// Local storage for all data
let allDivisions = [];
let allDistricts = [];
let allUpazilas = [];
let allUnions = [];

console.log(allDistricts, allDivisions);

// Generic fetch
async function fetchData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

// Reset select dropdown
function resetSelect(select, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>`;
  select.disabled = true;
}

// Populate select dropdown
function populateSelect(
  select,
  items,
  valueKey = "id",
  nameKey = "name",
  placeholder = "Select"
) {
  resetSelect(select, placeholder);
  if (!items || !items.length) return;
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item[valueKey];
    option.textContent =
      item[nameKey] + (item.bn_name ? ` (${item.bn_name})` : "");
    select.appendChild(option);
  });
  select.disabled = false;
}

// Update API endpoint display
function updateApiEndpoint(endpoint) {
  apiEndpointDisplay.textContent = endpoint;
}

// Show current list in data container
function showCurrentList(items) {
  if (!items || !items.length) {
    dataContainer.innerHTML = `<div class="text-center text-slate-400 py-4">No data to display</div>`;
    return;
  }
  dataContainer.innerHTML = `
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      ${items
        .map(
          (item) => `
        <div class="bg-slate-50 border border-slate-200 rounded-md p-3 text-center hover:bg-slate-100 hover:border-slate-300 transition-all">
          ${item.name} ${item.bn_name ? `(${item.bn_name})` : ""}
        </div>`
        )
        .join("")}
    </div>
  `;
}

// Clear current list
function clearCurrentList() {
  dataContainer.innerHTML = "";
}

// Load all data once
async function loadAllData() {
  try {
    const divisionsRes = await fetchData("/divisions");
    const districtsRes = await fetchData("/districts");
    const upazilasRes = await fetchData("/upazilas");
    const unionsRes = await fetchData("/unions");

    allDivisions = divisionsRes.data.data || [];
    allDistricts = districtsRes.data || [];
    allUpazilas = upazilasRes.data || [];
    allUnions = unionsRes.data || [];

    populateSelect(
      divisionSelect,
      allDivisions,
      "id",
      "name",
      "Select Division"
    );
    updateApiEndpoint("/api/geo/divisions");

    clearCurrentList(); // Make blank initially
  } catch (err) {
    console.error("Failed to load initial data:", err);
    dataContainer.innerHTML = `<div class="text-red-500 text-center py-4">Failed to load location data</div>`;
  }
}

// Division change
divisionSelect.addEventListener("change", () => {
  const divisionId = divisionSelect.value;
  resetSelect(districtSelect, "Select District");
  resetSelect(upazilaSelect, "Select Upazila");
  resetSelect(unionSelect, "Select Union");

  if (!divisionId) {
    clearCurrentList();
    return;
  }

  const filteredDistricts = allDistricts.filter(
    (d) => d.division_id == divisionId
  );
  populateSelect(
    districtSelect,
    filteredDistricts,
    "id",
    "name",
    "Select District"
  );
  updateApiEndpoint(`/api/geo/districts`);
  showCurrentList(filteredDistricts);
});

// District change
districtSelect.addEventListener("change", () => {
  const districtId = districtSelect.value;
  resetSelect(upazilaSelect, "Select Upazila");
  resetSelect(unionSelect, "Select Union");

  if (!districtId) {
    clearCurrentList();
    return;
  }

  const filteredUpazilas = allUpazilas.filter(
    (u) => u.district_id == districtId
  );
  populateSelect(
    upazilaSelect,
    filteredUpazilas,
    "id",
    "name",
    "Select Upazila"
  );
  updateApiEndpoint(`/api/geo/upazilas`);
  showCurrentList(filteredUpazilas);
});

// Upazila change
upazilaSelect.addEventListener("change", () => {
  const upazilaId = upazilaSelect.value;
  resetSelect(unionSelect, "Select Union");

  if (!upazilaId) {
    clearCurrentList();
    return;
  }

  const filteredUnions = allUnions.filter((u) => u.upazila_id == upazilaId);
  populateSelect(unionSelect, filteredUnions, "id", "name", "Select Union");
  updateApiEndpoint(`/api/geo/unions`);
  showCurrentList(filteredUnions);
});

// Union change
// Union change
unionSelect.addEventListener("change", () => {
  const upazilaId = upazilaSelect.value;

  if (!unionSelect.value) {
    clearCurrentList();
    return;
  }

  // Show previous level (upazila) items instead of filtering by union
  if (upazilaId) {
    const filteredUnions = allUnions.filter((u) => u.upazila_id == upazilaId);
    showCurrentList(filteredUnions);
  } else {
    clearCurrentList();
  }

  updateApiEndpoint(`/api/geo/unions`);
});

// Initialize
window.addEventListener("DOMContentLoaded", loadAllData);
