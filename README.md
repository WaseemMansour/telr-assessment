
## # Run Locally  
Install dependencies 
~~~bash  
npm install
~~~

Start the server
~~~bash  
npm start
~~~


## # Areas of improvements
### UI
- Segmentation and representation of Info is weird:\ and confusing for users. 
e.g. Total amount in header and then convenience fees? what is it?, is it included in the total or not?. 
- No heading for Payment methods section.
- Overall UI is very old style, inconvenient, and lacking beautiful design of elements and layout, leading to a very bad UX.
### Behavior
- Stop redirecting user suddenly to details.html page without any alert/notification.
- Credit Card Expiry date allows wrong input.
- Validation showing cvv invalid error message instead of expiry field. 
### Code quality
- Code has almost no formatting, which significantly impact code readability, should have eslinting rules defined and applied to avoid this.
- Many deprecated events and attributes e.g. `onkeypress`, `<center>` etc.
- Using inline style.
- Using `&nbsp;` for indentation.
- Duplicate element IDs.
- Unused blocks of commented code.
- Using magic strings e.g. `cvv_invalid` which is easy to mistype, should be using const or enum holding all these keys values to avoid this type of mistakes and to utilize IDE intellisense autocomplete.
- No `alt` attribute used for `<img` tags, which is essential for accessibility.
- Not using consistent naming convention e.g. `paymentStatus` & `payment_rejected`
- No encapsulation, variables and functions declared globally, polluting the global scope.
- Usage of old way of making http requests i.e. XHR, instead of fetch API, or Axios, which had become the default standard, unless there's specific need to use such old technology.
- Hardcoded JWT in the codebase is a major security issue, this should be extracted to Env variable. 
