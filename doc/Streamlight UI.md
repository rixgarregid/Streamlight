# Streamlight UI

<style></style>

In this guide you'll find how is the `Streamlight UI` structured and its elements.

### UI Variables

#### Text colors
```stylus
text-color-light
text-color-dark
text-color-highlight
text-color-subtle
text-color-light-selected
text-color-dark-selected
text-background-color-light
text-background-color-dark
```

#### Background colors
```stylus
background-color-light
background-color-dark
background-color-active
```

#### Other colors
```stylus
app-shadow-color
```

#### Sizes
```stylus
font-size-small
font-size-medium
font-size-large
font-size-large-2
```

### Icons

Streamlight uses IcoMoon for its icons. The list below shows all the available icons. To use an icon just create an `icon` tag and add the class icon- followed by the name of the icon.

```pug
icon.icon-close
```

### Inputs
Inputs and UI controls.

```pug
input(type='text' placeholder='Streamlight!').input-text
input(type='radio').input-radio
input(type='radio' checked).input-radio

label(for='some-check').input-label
input(type='checkbox' name='some-check').input-checkbox

input(type='range').input-range
input(type='color').input-color
input-toggle.input-toggle
textarea.input-textarea
select.input-select
    option Option 1
    option Option 1
    option Option 1
```

### Text classes

```pug
text Streamlight rocks!
text.text-subtle Some subtle text...
text.text-highlight This is a cool highlighted text!
text.text-success All right!
text.text-warning You should take care...
text.text-error Something went wrong...
```

### Buttons

#### Standalone buttons

```pug
button.btn Hey! Click me!
button.btn.btn-small Small Button
button.btn.btn-large Large Button
```

#### Icon buttons

```pug
button.btn.icon-home Home
button.btn.icon-settings Settings
button.btn.icon-close Close
```

#### Button Groups

```pug
div.btn-group
    button.btn Light
    button.btn.selected Dark

div.btn-group.btn-group-small
    button.btn One
    button.btn Two
    button.btn Three

div.btn-group.btn-group-large
    button.btn Cow
    button.btn Milk
    button.btn White
```

#### Panels

Used to limit UI components.

```pug
streamlight-panel Panel content goes here.
```

#### Lists

```pug
ul.list
    li.list-item First item!
    li.list-item.selected I'm the selected item!
    li.list-item.text-subtle And I'm a subtle text...
    li.list-item
        span.icon-user My account
```

#### Modals

```pug
streamlight-panel.modal Modal content.
```

```pug
streamlight-panel.modal
    text.text-highlight Modal Title
    text Lorem ipsum dolor sit amet!
    button.btn.icon-close Close!
```
