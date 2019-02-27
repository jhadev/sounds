# sounds

Base to create a soundboard for anything.
Uses Bootstrap, Animate.css, and FontAwesome.

[Demo](https://jhadev.github.io/sounds/)

### Todo

- [x] Badge the Sort All nav-item with the total sound count.
- [x] Show counts for each character's nav-items.
- [ ] Dynamically create the nav-items for filtering.
- [ ] Populate the nav-items with characters based on how many sounds they have. The most popular characters will automatically be featured in the navbar. (This will make setup a breeze)

### Step 1

---

Clone this repo and navigate to the assets/sounds folder.
Add your mp3 files to that folder.

### Step 2

---

Navigate to the assets/javascript folder and open 'app.js' in your code editor.
On line 7 you will see the class blueprint to layout your sound objects.

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

**_id_** = _number_ - The id of your sound. Go in order.

**_displayName_** = _string_ - The name you want displayed on the button to play your sound.

**_name_** = _string_ - The HTML value attribute that will be added to the button. **THIS MUST MATCH YOUR FILENAME**

**_character_** = _string_ - The name of the character to be displayed on the header ex: If this was a South Park soundboard we can say "Butters".

**_charId_** = _number_ - Determines whether the character will be featured in the navbar for sorting. Characters with an Id of 1-4 will be featured in the navbar and badged to count the total sounds for each character.

**_audio_** = uses the JavaScript new Audio constructor for our mp3 file. Takes one argument which is the path our mp3 file.

Start by declaring new Sounds. In our example we use South Park. See line 22 in "assets/javascript/app.js" for more details

    const sound1 = new Sound(
      1,
      "Please Don't Go",
      "pleasedontgo",
      "Butters",
      1,
      new Audio(`${path}pleasedontgo.mp3`)
    );

Next we push all the sounds into our items array.

    items.push(sound1, sound2, sound3, ...)

### Step 3

---

Navigate to the root of the project and open 'index.html' in your code editor.
On line 31 you will see the start of the navbar items. This the example. Since Butters was declared with a charId of 1 in Step 2, he will be our first nav-item. This will make sure each character gets the correct count for their total number of sounds on the navbar

    <li class="nav-item">
      <button class="btn badge m-1 name animated lightSpeedIn badge-secondary" id="Butters">
        Butters &nbsp<span class="char-1 badge badge-light"></span>
        <span class="sr-only">char-1-total</span>
      </button>
    </li>

These are used to filter the DOM by specific characters relevant to your soundboard. For the filtering to work the id of the button must match the displayName set when declaring each new sound in Step 2. The only things that need to be changed for the 4 nav-items are the id and the text to display on the page.

Repeat this step for the rest of the navbar items. The nav-item button named "Other" will take care of filtering for characters that aren't specificed in the 4 nav-items available.

### Step 4

---

Repeat Steps 1 and 2 every time you add more sounds (without cloning the repo of course). Test everything out and enjoy. It is mobile responsive and includes a dark theme. By default the page is loaded sorting the sounds in alphabetical order by character name. It also badges the card header with NEW for the last 10 sounds added. You can sort by newest sound added and play a random sound.
I'm sure there is a bug. Or 2 or 3, but it does work. Enjoy!
