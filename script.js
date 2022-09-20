const pronvinsiSelect = document.getElementById("provinsi");
const kabupatenSelect = document.getElementById("kabupaten");
const kecamatanSelect = document.getElementById("kecamatan");
const kelurahanSelect = document.getElementById("kelurahan");
const resultElement = document.getElementById("result");

const getProvinsi = async () => {
  const response = await fetch(
    "https://ibnux.github.io/data-indonesia/provinsi.json"
  );
  const data = await response.json();
  return data;
};

const getKabupaten = async (id) => {
  const response = await fetch(
    `https://ibnux.github.io/data-indonesia/kabupaten/${id}.json`
  );
  const data = await response.json();
  return data;
};

const getKecamatan = async (id) => {
  const response = await fetch(
    `https://ibnux.github.io/data-indonesia/kecamatan/${id}.json`
  );
  const data = await response.json();
  return data;
};

const getKelurahan = async (id) => {
  const response = await fetch(
    `https://ibnux.github.io/data-indonesia/kelurahan/${id}.json`
  );
  const data = await response.json();
  return data;
};

const getResult = async (key) => {
  const response = await fetch(`https://kodepos.vercel.app/search?q=${key}`);
  const data = await response.json();
  return data;
};

const removeData = (e) => {
  while (e.hasChildNodes()) {
    e.removeChild(e.firstChild);
  }
};

const displayProvinsi = async () => {
  const options = await getProvinsi();
  pronvinsiSelect.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    pronvinsiSelect.appendChild(newOption);
  });
  displayKabupaten();
};

const displayKabupaten = async () => {
  removeData(kabupatenSelect);
  const options = await getKabupaten(pronvinsiSelect.value);
  kabupatenSelect.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    kabupatenSelect.appendChild(newOption);
  });
  displayKecamatan();
};

const displayKecamatan = async () => {
  removeData(kecamatanSelect);
  const options = await getKecamatan(kabupatenSelect.value);
  kecamatanSelect.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    kecamatanSelect.appendChild(newOption);
  });
  displayKelurahan();
};

const displayKelurahan = async () => {
  removeData(kelurahanSelect);
  const options = await getKelurahan(kecamatanSelect.value);
  kelurahanSelect.value = options[0];
  options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.value = element.id;
    newOption.text = element.nama;
    kelurahanSelect.appendChild(newOption);
  });
  displayResult();
};

const displayResult = async () => {
  resultElement.innerHTML = "memuat...";

  const results = await getResult(
    kelurahanSelect.options[kelurahanSelect.selectedIndex].text
  );
  if (results.data.length <= 0) {
    resultElement.innerHTML = "tidak ditemukan data";
  } else {
    resultElement.innerHTML = results.data[0].postalcode;
  }
};

displayProvinsi();
