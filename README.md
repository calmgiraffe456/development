# Development

### Link to Deployed Website
`https://calmgiraffe456.github.io/development`

### Goal and Value of the Application
This application has the goal of letting people browse different buildings at Brown University and keep track of their favorites. Its value comes from the information it provides on the listed buildings: their use category, region of campus, date of construction, and area.

### Usability Principles Considered
Filters and sorts from different categories are able to be layered for ease of narrowing down on viewed buildings. That is to say, a user may choose one sort option, one Building Category option, one Campus Region option, and one Favorite viewing option. I used one dropdown button for each of these possible choices to reflect these relationships. The text of the dropdown button is whatever the currently selected option is so that users can quickly tell what sorts and filters are active. I also created a reset button for the user to easily be able to clear all filtering and sorting options. 

### Organization of Components
I have a BuildingCard component to represent one rectangle with building information. Everything on the green rectangles is made in the component, including the "Favorite" button.

### How Data is Passed Down Through Components
The props for the BuildingCard component are as follows:
* Building name
* Building image
* Building campus region
* Building construction year
* Building area
* addToFavorties function from App.js to add a specific building to the favorites list when the "Favorite" button is clicked
* removeFromFavorites function from App.js to remove a specific building to the favorites list when the "Remove from Favorites" button is clicked
* favoritesContains function from App.js to check if a building is already in the favorites list to determine the text on the button

The data comes from a JSON file I wrote with each of the buildings' data points. After modifying the data based on current filters and sorts, I map each item in the data to a BuildingElement component and pass in the props listed above.

Keeping track Total Area of Favorites is all done in App.js, in the addToFavorites and removeFromFavorites functions.

### How the User Triggers State Changes
The user can select from 4 different sorts with the top dropdown button. The possible sorts are Oldest to Newest (default), Newest to Oldest, Smallest to Largest, and Largest to Smallest. 

The user can select one option of the Building Cateogries to view using the second dropdown button. The options are All (default), Academic, Dining Hall, Dorm, or Library.

The user can select one option of the Campus Regions to view using the third dropdown button. The options are All (default), Main Green, Sciences Quad, Pembroke, Northwest, and Wriston Quad.

The user can add a building to their favorites by clicking the "Favorite" Button and can remove a building from their favorites by clicking the "Remove from Favorites" button.

The user can see their current favorites by setting the View dropdown button to Favorites. The default setting of it is All Buildings.

Finally, the user can reset their sort and filters to the original values by clicking the reset button.