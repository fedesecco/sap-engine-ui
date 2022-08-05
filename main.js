async function loadNames() {
    const response = await fetch('test-api.json');
    const data = await response.json();
}
loadNames();