## sounds

Base to create a soundboard for anything.

_some assembly required_

### Step 1

---

Clone this repo and navigate to the assets/sounds folder.
Add your mp3 files to that folder.

---

### Step 2

---

Navigate to the assets/javascript folder and open 'app.js' in your code editor.
On line 7 you will see the class blueprint to layout your sound objects.

    class Sound {
      constructor(id, displayName, name, character, audio) {
        this.id = id;
        this.displayName = displayName;
        this.name = name;
        this.character = character;
        this.audio = audio;
      }
    }

**_id_** = _number_ - The id of your sound. Go in order.

**_displayName_** = _string_ - The name you want displayed on the button to play your sound.

**_name_** = _string_ - The HTML value attribute that will be added to the button. **THIS MUST MATCH YOUR FILENAME**

**_character_** = _string_ - The name of the character to be displayed on the header ex: If this was a South Park soundboard we can say "Cartman".

**_audio_** = uses the JavaScript new Audio constructor for our mp3 file. Takes one argument which is the path our mp3 file.

Start by declaring new Sounds. In our example we use South Park.

    const sound1 = new Sound(
      1,
      "Respect",
      "respect",
      "Cartman",
      new Audio(`${path}respect.mp3`)
    );

Next we push all the sounds into our items array.

    items.push(sound1, sound2, sound3)

---

## Step 3

---

Navigate to the root of the project and open 'index.html' in your code editor.
On line 30 you will see the start of the navbar items.

    <li class="nav-item">
      <button class="btn badge m-1 name animated lightSpeedIn badge-secondary" id="Character 1" value="Character 1">
            Character 1
      </button>
    </li>

These are used to filter the DOM by specific characters relevant to your soundboard. For South Park we will change it to something like this:

    <li class="nav-item">
      <button class="btn badge m-1 name animated lightSpeedIn badge-secondary" id="Cartman" value="Cartman">
            Cartman
      </button>
    </li>

Repeat this step for the rest of the navbar items. The nav-item button named "Other" will take care of filtering for characters that aren't specificed in the 4 nav-items available.

---

## Step 4

---

Navigate to the assets/javascript folder and open 'app.js' in your code editor.
Find the _filterByCharacter_ function. It should look like this:

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

Add the character ids you specificed in Step 3 where you see "Character 1", "Character 2" and so on.
Using the South Park example when you are done that part of the function should look something like this:

    item.character != "Cartman" &&
    item.character != "Stan" &&
    item.character != "Kyle" &&
    item.character != "Butters"

**These values must match the ids specified in Step 3.**

---

## Step 5

---

Repeat Steps 1 and 2 every time you add more sounds (without cloning the repo of course). Test everything out and enjoy. It is mobile responsive and includes a dark theme. By default the page is loaded sorting the sounds in alphabetical order by character name. You can also sort by newest sound added and play a random sound. I'm sure theres is a bug. Or 2 or 3, but it does work.
