# Enhanced Axios HTTP Request Example

This guide will walk you through the features and steps to use the enhanced project:

## Features

1. **Fetch Single User**: Click 'Fetch 1 Random User' to retrieve one profile. // done
2. **Fetch Multiple Users**: Click 'Fetch 5 Random Users' to retrieve a batch. //done 
3. **Filtering & Searching**: Use the search box to filter displayed users by name. //done
4. **More User Details**: Cards show name, age, email, location, and phone number. //done 
5. **Theme Toggle**: Switch between light and dark modes with the toggle.

## Steps to Use

1. **Use the buttons** to fetch data:
   - 'Fetch 1 Random User' for a single profile.
   - 'Fetch 5 Random Users' for multiple profiles.
2. **Type in the search field** to filter on-the-fly by name.
3. **Toggle the theme switch** to see light/dark mode changes.

--- Modifications

## Exercise 1: Filter by Nationality //DONE

1. Modify the `fetchUsers` function so it always fetches **5** random users.
2. After fetching, filter the array to include only users whose `nat` property is `"US"` - Api to use for `"US"` nationality `https://randomuser.me/api/?results=5&nat=US` .

---

## Exercise 2: Count by Gender //DONE

1. Fetch **5** random users.
2. Iterate over the results and count how many are `"male"` and how many are `"female"` (look at the `gender` property).
3. Log a message like:

---

## Exercise 3: Compute Average Age  //DONE

1. Fetch **5** random users.
2. For each user, read their age from `dob.age`.
3. Calculate the average age across all fetched users.
4. Log the average (rounded to 1 decimal place).

---
