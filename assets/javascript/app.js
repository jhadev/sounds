const path = "assets/sounds/"; //path to mp3 files

//DECLARE ARRAY
const items = [];

//CLASS TO LAYOUT SOUND OBJECTS
class Sound {
  constructor(id, displayName, name, character, charId, audio) {
    this.id = id;
    this.displayName = displayName;
    this.name = name;
    this.character = character;
    this.charId = charId;
    this.audio = audio;
  }
}

//DECLARE NEW SOUND CONSTRUCTORS

//example

const sound1 = new Sound(
  1, //id of object
  "Please Don't Go", //string to display on button
  "pleasedontgo", //name must match mp3 filename
  "Butters", //character name to write to header
  1, //featured characters are set in order they appear on nav
  new Audio(`${path}pleasedontgo.mp3`) //audio file
);

const sound2 = new Sound(
  2, //id
  "Respect", //string to display on button
  "respect", //name of file must match mp3 filename
  "Cartman", //character name to write to header
  2, //cartman is assigned a charId of 2 since he is featured in the navbar and will appear 2nd
  new Audio(`${path}respect.mp3`) //audio file in sounds folder
);

const sound3 = new Sound(
  3,
  "Killed Kenny", //display name on button
  "killed", //name of file must match mp3 filename
  "Stan",
  3, //stan is set as 3 since he is 3rd in the navbar
  new Audio(`${path}killed.mp3`) //audio file
);

const sound4 = new Sound(
  4,
  "Good Job", //display name on button
  "goodjob", //name of file must match mp3 filename
  "Kyle",
  4, //kyle is set as 4 since he is the 4th in our navbar
  new Audio(`${path}goodjob.mp3`) //audio file
);

const sound5 = new Sound(
  5,
  "Timmy!", //display name on button
  "timmy", //name of file must match mp3 filename
  "Timmy", //character to write to header
  5, //Timmy's charId is 5 he is filed in Other on the navbar
  new Audio(`${path}timmy.mp3`) //audio file
);

const sound6 = new Sound(
  6,
  "Going Home", //display name on button
  "goinghome", //name of file must match mp3 filename
  "Cartman", //character to write to header
  2, //Cartman's charId is 2 he is 2nd on the navbar
  new Audio(`${path}goinghome.mp3`) //audio file
);

//PUSH INTO ARRAY

items.push(sound1, sound2, sound3, sound4, sound5, sound6);

//FUNCTIONS FOR SORTING
const sortByCharacter = (a, b) => {
  if (a.character > b.character) return 1;
  if (a.character < b.character) return -1;
  return 0;
};

const sortById = (a, b) => {
  if (a.id < b.id) return 1;
  if (a.id > b.id) return -1;
  return 0;
};

//SORT
items.sort(sortByCharacter);

//PLAY RANDOM FUNCTION
const random = () => {
  const item = items[Math.floor(Math.random() * items.length)].audio;
  item.play();
};

//func to capitalize first letter of displayName property of Sound object
const capitalizeFirst = string => {
  return string[0].toUpperCase() + string.slice(1);
};

//PRINT HTML
const layout = array => {
  array.forEach(item => {
    const { id, name, displayName, character } = item;
    const columnDiv = $("<div>").addClass("col-lg-4 col-md-6 col-12");
    const cardDiv = $("<div>");
    cardDiv.addClass("card shadow m-2").appendTo(columnDiv);
    const cardHeader = $("<div>");
    id >= items.length - 10
      ? cardHeader.html(
          `${character} <div id="new" class="ml-1 badge badge-pill badge-warning">NEW</div>`
        )
      : cardHeader.text(character);
    cardHeader.addClass("card-header").appendTo(cardDiv);
    const cardBody = $("<div>");
    cardBody.addClass("card-body").appendTo(cardDiv);
    const playButton = $("<button>");
    playButton
      .addClass("btn btn-primary animated btn-lg btn-block play")
      .val(name)
      .attr({
        data: "play"
      })
      .html(
        `<i class="fas fa-play-circle ml-2"></i> ${capitalizeFirst(
          displayName
        )}`
      )
      .appendTo(cardBody);
    const pauseButton = $("<button>");
    pauseButton
      .addClass("btn btn-danger animated btn-lg btn-block stop")
      .val(name)
      .attr({
        data: "stop"
      })
      .html(`<i class="far fa-pause-circle ml-2"></i> Pause`)
      .appendTo(cardBody);
    $(".start").append(columnDiv);
    $(".total-count").text(items.length);
    if ($("body").hasClass("bg-dark")) {
      $(".card").addClass(`bg-dark border-light`);
      $(".card-header").addClass("text-light");
    }
  });
};

layout(items);

//REBUILD DOM BY CHARACTER

const genNavItems = () => {
  const itemsCopy = [...items];
  const filterByCharId = itemsCopy.filter(item => item.charId < 5);

  const sortedItems = filterByCharId.sort((a, b) => {
    if (a.charId > b.charId) return 1;
    if (a.charId < b.charId) return -1;
    return 0;
  });

  //call lodash to remove dupes
  const characters = _.uniqBy(sortedItems, "character");

  for (let i = 0; i < characters.length; i++) {
    const { character, charId } = characters[i];

    $(".start-buttons").before(`
    <li>
      <button class="btn badge m-1 name gen animated fadeIn badge-secondary" value="${character}">${character} &nbsp
        <span class="char-${charId} badge badge-light"></span>
      </button>
    </li>`);
  }
};

genNavItems();

const countAll = () => {
  const newItems = [...items];
  const charOne = newItems.filter(item => item.charId === 1);
  const charTwo = newItems.filter(item => item.charId === 2);
  const charThree = newItems.filter(item => item.charId === 3);
  const charFour = newItems.filter(item => item.charId === 4);
  const other = newItems.filter(item => item.charId > 4);
  $(".char-1").text(charOne.length);
  $(".char-2").text(charTwo.length);
  $(".char-3").text(charThree.length);
  $(".char-4").text(charFour.length);
  $(".other-total").text(other.length);
};

countAll();

const filterByCharacter = event => {
  const { id, value } = event.target;
  const itemsClone = [...items];
  const filteredArray = itemsClone.filter(item => value === item.character);
  const otherArray = itemsClone.filter(
    item => id === "Other" && item.charId > 4
  );
  //match character names with navbar badge HTML for filtering. "Other" will auto match with characters not matched with these ids if their isFeatured property is set to false.
  $(".start").empty();
  if (id === "Other") {
    otherArray.sort(sortByCharacter);
    layout(otherArray);
  } else {
    filteredArray.sort(sortById);
    layout(filteredArray);
  }
};

const sortAll = event => {
  const counter = `
    <span class="total-count badge badge-light">
      ${items.length}
    </span>`;
  const { value } = event.target;
  switch (value) {
    case "sortbynew":
      items.sort(sortById);
      $(".start").empty();
      layout(items);
      $(".sort")
        .text("Sort by Name ")
        .val("sortbyname")
        .append(counter);
      break;
    case "sortbyname":
      items.sort(sortByCharacter);
      $(".start").empty();
      layout(items);
      $(".sort")
        .text("Sort By New ")
        .val("sortbynew")
        .append(counter);
      break;
  }
};

//STOP FUNC
const stopSound = event => {
  $(event.target).addClass("pulse fast");
  const { value } = event.target;
  items.forEach(sound => {
    const { name, audio } = sound;
    if (name === value) {
      audio.pause();
    }
  });
  window.setTimeout(() => {
    $(event.target).removeClass("pulse fast");
  }, 2000);
};

//PLAY FUNC
const playSound = event => {
  $(event.target).addClass("pulse fast");
  const { value } = event.target;
  items.forEach(sound => {
    const { name, audio } = sound;
    if (name === value) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  window.setTimeout(() => {
    $(event.target).removeClass("pulse fast");
  }, 2000);
};

//THEME FUNCTION
const checkTheme = () => {
  if ($("body").hasClass("bg-light")) {
    $("body, .card").removeClass("bg-light");
    $(".navbar-brand, .card-header").removeClass("text-dark");
    $(".navbar").removeClass(`bg-light navbar-light`);
    $(".theme").removeClass("badge-dark");
    $(".extra").removeClass(`badge-light text-dark`);

    //
    $("body").addClass("bg-dark");
    $(".navbar-brand, .card-header").addClass("text-light");
    $(".navbar").addClass(`navbar-dark bg-dark`);
    $(".card").addClass(`bg-dark border-light`);
    $(".theme").text("Light");
    $(".theme").addClass("badge-light");
    $(".extra").addClass(`badge-dark text-light`);

    //
  } else if ($("body").hasClass("bg-dark")) {
    $("body").removeClass("bg-dark");
    $(".navbar-brand, .card-header").removeClass("text-light");
    $(".navbar").removeClass(`bg-dark navbar-dark`);
    $(".card").removeClass(`bg-dark border-light`);
    $(".theme").removeClass("badge-light");
    $(".extra").removeClass(`badge-dark text-light`);

    //
    $("body").addClass("bg-light");
    $(".navbar-brand, .card-header").addClass("text-dark");
    $(".navbar").addClass(`bg-light navbar-light`);
    $(".theme")
      .text("Dark")
      .addClass("badge-dark");
    $(".extra").addClass(`badge-light text-dark`);
  }
};

//CLICK FUNCTION TO PLAY
$(document).on("click", ".play", event => {
  event.preventDefault();
  playSound(event);
});

//CLICK FUNCTION TO PAUSE
$(document).on("click", ".stop", event => {
  event.preventDefault();
  stopSound(event);
});

//CLICK FUNCTION TO SORT DOM
$(document).on("click", ".sort", event => {
  event.preventDefault();
  sortAll(event);
});

//CLICK FUNCTION FOR RANDOM
$(document).on("click", ".random", event => {
  event.preventDefault();
  random();
  $("#navbarNav").collapse("hide");
});

//CLICK FUNCTION TO REBUILD DOM
$(document).on("click", ".name", event => {
  event.preventDefault();
  filterByCharacter(event);
});

//CLICK FUNCTION FOR THEME
$(document).on("click", ".theme", event => {
  event.preventDefault();
  checkTheme();
});
