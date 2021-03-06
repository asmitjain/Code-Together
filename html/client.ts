 //const url = 'http://localhost:8080/codetogether'; //Local host
const url = 'https://cs-326-final-omega.herokuapp.com/codetogether';
const projName = '';
window.onload = function() {
	let url2 = document.location.href,
		params = url2.split('?')[1].split('&'), //Will be 'name' or 'lastName' in our case (Splits after ?, before &)
		data = {
			name: null,
			lastName: null
		},
		tmp;
	this.console.log('Original url: ' + url2);
	for (let i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('='); //Splits around equals, so tmp[0] is the variable name and tmp[1] is the variable value
		data[tmp[0]] = tmp[1];
	}

	this.console.log('data[name]: ' + data['name']);
	this.console.log('data[lastName]: ' + data['lastName']);
	//this.console.log('data[email]: ' + data['email']);

	//Read project from html
	if (data['name']) {
		this.console.log(data.name);
		this.projectRead(data.name);
		this.projName = data.name;
	} else if (data['lastName']) {
		//Read profile from html
		this.console.log('calling profileRead on: ' + data.lastName);
		this.profileRead(data.lastName);
	}
	// //Signing in, redirect to update the rest of their profile
	// else if(data['email']){
	// 	this.console.log('redirect to profileUpdate with param: ' + data.email);
	// 	this.profileUpdate(data.email);
	// }

	// haven't thought how would index.html work with the same function
};
async function postData(url: string, data: any) {
	const resp = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		body: JSON.stringify(data)
	});
	return resp;
}

//CREATE functions
function projectCreate(): void {
	(async () => {
		let pName = document!.getElementById('projectName') as HTMLInputElement;
		let projectName: string = pName!.value;
		let pDesc = document!.getElementById('projectDescription') as HTMLInputElement;
		let projectDescription: string = pDesc!.value;
		let pWork = document!.getElementById('projectWorkers') as HTMLInputElement;
		let projectWorkers: string = pWork!.value;
		let pProg = document!.getElementById('projectProgress') as HTMLInputElement;
		let projectProgress: string = pProg!.value;
		let pLink = document!.getElementById('projectLinks') as HTMLInputElement;
		let projectLinks: string = pLink!.value;
		let pNW = document!.getElementById('projectNumWorkers') as HTMLInputElement;
		let projectNumWorkers: string = pNW!.value;
		let projectButtons: string[] = $.map($('input:checkbox:checked'), function(e: HTMLInputElement, i) {
			return e.value;
		});

		//Then create JSON to return
		const projectData = {
			projectName: projectName,
			projectDescription: projectDescription,
			projectWorkers: projectWorkers,
			projectProgress: projectProgress,
			projectLinks: projectLinks,
			projectButtons: projectButtons,
			projectNumWorkers: projectNumWorkers
		};

		//For now, userName will be omega
		const newURL = url + '/users/' + 'omega' + '/createProject';
		console.log('projectCreate: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();
		let createProjectOutput = document.getElementById('createProjectOutput') as HTMLOutputElement;
		createProjectOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			createProjectOutput.innerHTML = 'Project: ' + j['name'] + ' was created successfully';
		} else {
			createProjectOutput.innerHTML = 'Error Occurred During Creation';
		}
	})();
}

function profileCreate(): void {
	(async () => {
		//Only need the elements on the sign up page
		let profileID: number = Math.floor(Math.random() * 100000);
		let fName = document!.getElementById('firstName') as HTMLInputElement;
		let firstName: string = fName!.value;
		let lName = document!.getElementById('lastName') as HTMLInputElement;
		let lastName: string = lName!.value;
		let em = document!.getElementById('inputEmail') as HTMLInputElement;
		let email: string = em!.value;
		let pword = document!.getElementById('inputPassword') as HTMLInputElement;
		let password: string = pword!.value;

		const profileData = {
			profileID: profileID,
			firstName: firstName,
			lastName: lastName,
			profileAbout: 'This user has not completed this section',
			profileBio: 'This user has not completed this section',
			profileEmail: email,
			profileLinks: 'This user has not completed this section',
			profilePassword: password,
			profileProjects: 'This user has not completed this section'
		};

		//For now, userName will be omega
		const newURL = url + '/users/' + 'omega' + '/createProfile';
		console.log('projectCreate: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		const j = await resp.json();
		let createProfOutput = document!.getElementById('createProfOutput') as HTMLOutputElement;
		createProfOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			console.log(j['result']);
			let hyperlink = "<a href='edit_profile.html'>Click Here to Finish Your Profile!</a>";
			console.log('hyperlink: ' + hyperlink);
			createProfOutput.innerHTML =
				'User:' + firstName + ' ' + lastName + "'s profile has been created. " + hyperlink;
		} else {
			createProfOutput.innerHTML = 'Error Occurred During Profile Creation';
		}
	})();
}

//READ Functions
function projectRead(name: string): void {
	(async () => {
		//We just need projectName, then we'll look up other attributes in DB
		// let nameFromDoc = document.getElementById('nameFromDoc').value;
		let pName: string = await name;
		const projectData = {
			projectName: pName
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProject';
		console.log('projectRead: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();

		//This the JSON returned from the db in readProject() in myserver-routing
		let project = j.projectAttributes;
		console.log(project);
		//Now declare all attributes using the above JSON
		let projectName: string = project.projectName;
		let projectDescription: string = project.projectDescription;
		let projectWorkers: string = project.projectWorkers;
		let projectProgress: string = project.projectProgress;
		let projectLinks: string = project.projectLinks;
		let projectButtons: string[] = project.projectButtons;
		let projectNumWorkers: string = project.projectNumWorkers;

		let rowDiv: HTMLElement = document.getElementById('projectButtons');
		projectButtons.forEach((element) => {
			var button = document.createElement('button');
			button.type = 'button';
			button.classList.add('btn');
			button.classList.add('btn-success');
			button.classList.add('btn-sm');
			button.classList.add('mr-1');
			if (element !== null) {
				button.classList.add('mt-2');
			}
			button.textContent = element;
			rowDiv.appendChild(button);
		});
		//let readProjectOutput = document.getElementById('readProjectOutput');
		//readProjectOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			//Assigning variables to html elements
			document.getElementById('projectName').innerHTML = projectName;
			document.getElementById('projectDescription').innerHTML = projectDescription;
			document.getElementById('projectWorkers').innerHTML = projectWorkers;
			document.getElementById('projectProgress').innerHTML = projectProgress;
			document.getElementById('projectLinks').innerHTML = projectLinks;
			document.getElementById('projectNumWorkers').innerHTML = projectNumWorkers;

			//readProjectOutput.innerHTML = 'Read the output of project: ' + j['name'];
		} else {
			//readProjectOutput.innerHTML = 'Does not work';
			console.log('Error Occurred in projectRead');
		}
	})();
}

function profileRead(lastName: string): void {
	(async () => {
		//Get profileID of profile we want to read
		//let searchID = document.getElementById('searchID');

		// let profileData = {
		// 	profileID: searchID
		// };
		let lName: string = await lastName;
		let profileData = {
			lastName: lName
		};

		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/readProfile';
		console.log('counterRead: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		console.log(resp);
		const j = await resp.json();

		//This *should* be a JSON of the profile
		let profile = j.profileAttributes;
		console.log('profile in profileRead : ' + profile);

		//Assign values needed to display on html
		let firstName: string = profile.firstName;
		let lastName2: string = profile.lastName;
		let bio: string = profile.profileBio;
		let about: string = profile.profileAbout;
		let projects: string = profile.profileProjects;
		let links: string = profile.profileLinks;
		let skillsArray: string[] = profile.skills;

		let rowDiv: HTMLElement = document.getElementById('skillsSection');
		skillsArray.forEach((element) => {
			var button = document.createElement('button');
			button.type = 'button';
			button.classList.add('btn');
			button.classList.add('btn-success');
			button.classList.add('btn-sm');
			button.classList.add('mr-1');
			if (element !== null) {
				button.classList.add('mt-2');
			}
			button.textContent = element;
			rowDiv.appendChild(button);
		});

		if (j['result'] !== 'error') {
			//Now, fill in HTML with stuff we read
			document.getElementById('profileName').innerHTML = '<b>' + firstName + ' ' + lastName2 + '</b>';
			document.getElementById('bio').innerHTML = bio;
			document.getElementById('aboutSection').innerHTML = about;
			document.getElementById('projectSection').innerHTML = projects;
			document.getElementById('contactSection').innerHTML = links;
		} else {
			document.getElementById('profileName').innerHTML = 'User Not Found';
		}
	})();
}

//UPDATE Functions
function projectUpdate(): void {
	(async () => {
		let pName = document!.getElementById('projectName') as HTMLInputElement;
		let projectName: string = pName!.value;
		let pDesc = document!.getElementById('projectDescription') as HTMLInputElement;
		let projectDescription: string = pDesc!.value;
		let pWork = document!.getElementById('projectWorkers') as HTMLInputElement;
		let projectWorkers: string = pWork!.value;
		let pProg = document!.getElementById('projectProgress') as HTMLInputElement;
		let projectProgress: string = pProg!.value;
		let pLink = document!.getElementById('projectLinks') as HTMLInputElement;
		let projectLinks: string = pLink!.value;
		let pNW = document!.getElementById('projectNumWorkers') as HTMLInputElement;
		let projectNumWorkers: string = pNW!.value;
		let projectButtons: string[] = $.map($('input:checkbox:checked'), function(e: HTMLInputElement, i) {
			return e.value;
		});
		const projectData = {
			projectName: projectName,
			projectDescription: projectDescription,
			projectWorkers: projectWorkers,
			projectProgress: projectProgress,
			projectLinks: projectLinks,
			projectButtons: projectButtons,
			projectNumWorkers: projectNumWorkers
		};

		let userName = 'omega';
		const newURL = url + '/users/' + userName + '/updateProject';
		console.log('counterUpdate: fetching ' + newURL);
		const resp = await postData(newURL, projectData);
		const j = await resp.json();
		let updateProjectOutput = document.getElementById('updateProjectOutput') as HTMLOutputElement;
		updateProjectOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			updateProjectOutput.innerHTML = 'Project: ' + j['name'] + ' has been updated successfully';
		} else {
			updateProjectOutput.innerHTML = 'Error Occurred During Update';
		}
	})();
}

function profileUpdate() {
	(async () => {
		//Get relevant info from html page
		//NOTE: id, email, password will be retrieved from db, they won't be on the edit profile page, but we need them for the JSON
		// let pID = document!.getElementById('idInput') as HTMLInputElement;
		// let profileID: number = parseInt(pID!.value);
		let fName = document!.getElementById('firstNameInput') as HTMLInputElement;
		let firstName: string = fName!.value;
		let lName = document!.getElementById('lastNameInput') as HTMLInputElement;
		let lastName: string = lName!.value;
		// let em = document!.getElementById('emailInput') as HTMLInputElement;
		// let email: string = em!.value;
		// let pword = document!.getElementById('passwordInput') as HTMLInputElement;
		// let password: string = pword!.value;
		let bio = document!.getElementById('bioInput') as HTMLInputElement;
		let profileBio = bio!.value;
		let about = document!.getElementById('aboutInput') as HTMLInputElement;
		let profileAbout = about!.value;
		let projects = document!.getElementById('projectInput') as HTMLInputElement;
		let profileProjects = projects!.value;
		let links = document.getElementById('linkInput') as HTMLInputElement;
		let profileLinks = links!.value;
		let skills: string[] = $.map($('input:checkbox:checked'), function(e: HTMLInputElement, i) {
			return e.value;
		});

		const profileData = {
			//profileID: profileID,
			//profileEmail: email,
			//profilePassword: password,
			firstName: firstName,
			lastName: lastName,
			profileBio: profileBio,
			profileAbout: profileAbout,
			profileProjects: profileProjects,
			profileLinks: profileLinks,
			skills: skills
		};

		//Example userName for now
		let userName = 'omega';

		const newURL = url + '/users/' + userName + '/updateProfile';
		console.log('counterUpdate: fetching ' + newURL);
		const resp = await postData(newURL, profileData);
		const j = await resp.json();
		let updateOutput = document.getElementById('updateOutput') as HTMLOutputElement;
		updateOutput.style.visibility = 'visible';
		if (j['result'] !== 'error') {
			updateOutput.innerHTML = 'User: ' + j['name'] + "'s " + 'profile has been updated';
		} else {
			updateOutput.innerHTML = 'Error Occurred During Update';
		}
	})();
}

//DELETE Functions
function projectDelete(): void {
	(async () => {
		// let projectName = this.projecName
		console.log(this.projName);

		let deleteProject: string = this.projName;
		console.log(this.projName);
		//Then, delete in database using projectName
		let userName = 'omega';

		const data = { projectName: deleteProject };

		const newURL = url + '/users/' + userName + '/deleteProject';
		console.log('counterDelete: fetching ' + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();

		if (j['result'] !== 'error') {
			let deleteOutput = document.getElementById('deleteOutput') as HTMLOutputElement;
			deleteOutput.style.visibility = 'visible';
			deleteOutput.innerHTML = 'Project: ' + deleteProject + ' has been deleted';
		} else {
			document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
		}

		// tried javascript sleep
		// setTimeout(() => {
		// 	console.log('World!');
		// }, 5000);
		// redirects to the index.html page after deleting
		//document.location.href = '../index.html';
	})();
}

function profileDelete(): void {
	(async () => {
		// let profileName = document.getElementById('profileName').innerHTML;
		let pName = document!.getElementById('profileName') as HTMLInputElement;
		let profileName: string = pName!.innerHTML;
		console.log('profileName: ' + profileName);
		let lastName: string = profileName.split(' ')[1].split('<')[0];
		console.log('lastName : ' + lastName);
		//Then, delete in database using projectName
		let userName = 'omega';

		const data = { lastName: lastName };

		const newURL = url + '/users/' + userName + '/deleteProfile';
		console.log('counterDelete: fetching ' + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] !== 'error') {
			// let deleteOutput = document.getElementById('deleteProf') as HTMLOutputElement;
			// deleteOutput.style.visibility = 'visible';
			// deleteOutput.innerHTML = 'Profile: ' + profileName + ' has been deleted';
		} else {
			//document.getElementById('deleteOutput').innerHTML = 'Error Occurred during deletion';
		}
	})();
}

//Clears the results div and adds a "Results" header
function resultsHelper(): void {
	let resultsDiv = document.getElementById('results');
	let child = resultsDiv.lastElementChild;
	while (child) {
		resultsDiv.removeChild(child);
		child = resultsDiv.lastElementChild;
	}
	let resultHeader = document.createElement('h5');
	resultHeader.classList.add('card-header');
	resultHeader.classList.add('mt-4');
	resultHeader.innerHTML = 'Results:';
	resultsDiv.appendChild(resultHeader);
}

// get all projects from the database
function findAllProjects(): void {
	console.log('finding all projects');
	(async () => {
		// do we need to add anything to data?
		//
		const data = {};
		const newURL: string = url + '/users/' + 'omega' + '/allProjects';
		const resp = await postData(newURL, data);

		console.log('getting response');
		const j = await resp.json();
		console.log('printing response:-- ');
		console.log(resp);

		let projects = j['projects'];
		console.log(projects);

		resultsHelper();

		for (let i = 0; i < projects.length; i++) {
			let projectName = projects[i]['projectName'];
			let projectDescription = projects[i]['projectDescription'];
			let projectButtons = projects[i]['projectButtons'];
			addProject(projectName, projectDescription, projectButtons);
		}
	})();
}

//Returns specific projects with projectName matching the one given in the serach bar
function projectSearch() {
	console.log('finding all projects');
	(async () => {
		let sk = document!.getElementById('searchBar') as HTMLInputElement;
		let searchKey = sk!.value;

		const data = {
			searchKey: searchKey
		};
		console.log('Search key in client: ' + searchKey);
		const newURL: string = url + '/users/' + 'omega' + '/projectSearch';
		const resp = await postData(newURL, data);

		console.log('getting response');
		const j = await resp.json();
		console.log('printing response:-- ');
		console.log(resp);

		let resultList = j['resultList'];
		console.log('resultList: ' + resultList);
		console.log('resultList[0][projectName]: ' + resultList[0]['projectName']);
		console.log('resultList[0][lastName]: ' + resultList[0]['lastName']);

		resultsHelper();

		if (resultList[0]['projectName']) {
			console.log('resultList contains projects');
			for (let i = 0; i < resultList.length; i++) {
				let projectName = resultList[i]['projectName'];
				let projectDescription = resultList[i]['projectDescription'];
				let projectButtons = resultList[i]['projectButtons'];
				addProject(projectName, projectDescription, projectButtons);
			}
		} else if (resultList[0]['lastName']) {
			console.log('resultList contains profiles');
			for (let i = 0; i < resultList.length; i++) {
				let firstName = resultList[i]['firstName'];
				let lastName = resultList[i]['lastName'];
				let profileBio = resultList[i]['profileBio'];
				addProfile(firstName, lastName, profileBio);
			}
		}
	})();
}

// trying something
// once we load all the projects in index.html
// onclick function changes the global variable - projectName
// then once we go to the project_description page - we use the project name and load that project
// function projectClick(name, page_name) {

// 	if (page_name === 'index') {
// 		// we get the project name here when they click on the function
// 		projectName = name;
// 		window.location.replace("./pages/page_description.html");
// 	} else if (page_name === 'description') {
// 		let n = projectName;
// 		console.log(n);
// 	}
// }

function addProject(projectName: string, projectDescription: string, projectButtons: string[]) {
	let mainDiv: HTMLElement = document.getElementById('results');

	// card div
	let cardDiv: HTMLElement = document.createElement('div');

	cardDiv.classList.add('card');
	cardDiv.classList.add('mt-4');
	// cardmt-4

	// card body
	let cardBodyDiv: HTMLElement = document.createElement('div');
	cardBodyDiv.classList.add('card-body');

	let a: HTMLElement = document.createElement('a');
	//a.href = './pages/project_description.html?name=' + projectName;
	a.setAttribute('href', './pages/project_description.html?name=' + projectName);
	// a.onClick = projectClick(projectName, 'index')
	a.textContent = projectName;
	a.classList.add('card-title');
	//a.style = 'color: green;font-size: 24px;';
	a.setAttribute('style', 'color: green;font-size: 24px;');

	let text: HTMLElement = document.createElement('p');
	text.textContent = projectDescription;

	let rowDiv: HTMLElement = document.createElement('div');
	rowDiv.classList.add('row');
	rowDiv.classList.add('mb-2');
	rowDiv.classList.add('ml-0');

	let skills: string[] = projectButtons;

	for (let i = 0; i < projectButtons.length; i++) {
		var button = document.createElement('button');
		button.classList.add('btn');
		button.classList.add('btn-success');
		if (i != 0) {
			button.classList.add('ml-2');
		}
		button.textContent = skills[i];
		rowDiv.appendChild(button);
	}

	cardBodyDiv.appendChild(a);
	cardBodyDiv.appendChild(text);
	cardBodyDiv.appendChild(rowDiv);

	cardDiv.appendChild(cardBodyDiv);
	mainDiv.appendChild(cardDiv);
}

function addProfile(firstName: string, lastName: string, profileBio: string) {
	let mainDiv: HTMLElement = document.getElementById('results');

	// card div
	let cardDiv: HTMLElement = document.createElement('div');

	cardDiv.classList.add('card');
	cardDiv.classList.add('mt-4');
	// cardmt-4

	// card body
	let cardBodyDiv = document.createElement('div');
	cardBodyDiv.classList.add('card-body');

	let a: HTMLElement = document.createElement('a');
	//a.href = './pages/profile.html?lastName=' + lastName;
	a.setAttribute('href', './pages/profile.html?lastName=' + lastName);
	// a.onClick = projectClick(projectName, 'index')
	a.textContent = firstName + ' ' + lastName;
	a.classList.add('card-title');
	//a.style = 'color: green;font-size: 24px;';
	a.setAttribute('style', 'color: green;font-size: 24px;');

	let text: HTMLElement = document.createElement('p');
	text.textContent = profileBio;

	let rowDiv: HTMLElement = document.createElement('div');
	rowDiv.classList.add('row');
	rowDiv.classList.add('mb-2');
	rowDiv.classList.add('ml-0');

	cardBodyDiv.appendChild(a);
	cardBodyDiv.appendChild(text);
	cardBodyDiv.appendChild(rowDiv);

	cardDiv.appendChild(cardBodyDiv);
	mainDiv.appendChild(cardDiv);
}
