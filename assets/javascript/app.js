const path = "assets/sounds/";

//DECLARE ARRAY
const items = [];

//CLASS TO LAYOUT SOUND OBJECTS
class Sound {
  constructor(id, displayName, name, character, audio) {
    this.id = id;
    this.displayName = displayName;
    this.name = name;
    this.character = character;
    this.audio = audio;
  }
}

//DECLARE NEW SOUND CONSTRUCTORS

//example
const sound1 = new Sound(
  1,
  "Respect", //display name on button
  "respect", //name of file must match mp3 filename
  "Cartman", //character to write to header
  new Audio(`${path}respect.mp3`) //audio file
);

const sound2 = new Sound(
  2,
  "Killed Kenny", //display name on button
  "killed", //name of file must match mp3 filename
  "Stan", //character to write to header
  new Audio(`${path}killed.mp3`) //audio file
);
//PUSH INTO ARRAY

items.push(sound1, sound2);

//COMPARE FUNCTION FOR SORT
const compare = (a, b) => {
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
items.sort(compare);

//PLAY RANDOM FUNCTION
const random = () => {
  const item = items[Math.floor(Math.random() * items.length)].audio;
  item.play();
};

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
    id > array.length - 12
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
    if ($("body").hasClass("bg-dark")) {
      $(".card").addClass(`bg-dark border-light`);
      $(".card-header").addClass("text-light");
    }
  });
};

layout(items);

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
  sortAllSounds(/*num*/);
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

//THEME FUNCTION
const checkTheme = () => {
  if ($("body").hasClass("bg-light")) {
    $("body, .card, .dropdown-menu").removeClass("bg-light");
    $(".navbar-brand, .card-header").removeClass("text-dark");
    $(".navbar").removeClass(`bg-light navbar-light`);
    $(".name").removeClass("badge-secondary");
    $(".theme").removeClass("badge-dark");
    $(".extra").removeClass(`badge-light text-dark`);

    //
    $("body, .dropdown-menu").addClass("bg-dark");
    $(".navbar-brand, .card-header").addClass("text-light");
    $(".navbar").addClass(`navbar-dark bg-dark`);
    $(".card").addClass(`bg-dark border-light`);
    $(".theme").text("Light");
    $(".theme, .name").addClass("badge-light");
    $(".extra").addClass(`badge-dark text-light`);

    //
  } else if ($("body").hasClass("bg-dark")) {
    $("body, .dropdown-menu").removeClass("bg-dark");
    $(".navbar-brand, .card-header").removeClass("text-light");
    $(".navbar").removeClass(`bg-dark navbar-dark`);
    $(".card").removeClass(`bg-dark border-light`);
    $(".theme, .name").removeClass("badge-light");
    $(".extra").removeClass(`badge-dark text-light`);

    //
    $("body, .dropdown-menu").addClass("bg-light");
    $(".navbar-brand, .card-header").addClass("text-dark");
    $(".navbar").addClass(`bg-light navbar-light`);
    $(".theme")
      .text("Dark")
      .addClass("badge-dark");
    $(".name").addClass("badge-secondary");
    $(".extra").addClass(`badge-light text-dark`);
  }
};

//REBUILD DOM BY CHARACTER

const filterByCharacter = event => {
  const { id } = event.target;
  const itemsClone = [...items];
  const filteredArray = itemsClone.filter(item => id == item.character);
  const otherArray = itemsClone.filter(
    item =>
      id == "Other" &&
      item.character != "Character 1" &&
      item.character != "Character 2" &&
      item.character != "Character 3" &&
      item.character != "Character 4"
  );
  $(".start").empty();
  if (id == "Other") {
    otherArray.sort(compare);
    layout(otherArray);
  } else {
    filteredArray.sort(sortById);
    layout(filteredArray);
  }
};

//BUGGY SORT FUNC
const sortAllSounds = () => {
  const sortItems = [...items];
  if (items[0].id < items.length) {
    items.sort(sortById);
    $(".start").empty();
    layout(items);
    $(".sort").text("Show All by Name");
  } else if (items[0].id >= items.length) {
    items.sort(compare);
    $(".start").empty();
    layout(items);
    $(".sort").text("Show All By New");
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
