## # Areas of improvements
### UI
- Segmentation and representation of Info is weird:\ and confusing for users. 
e.g. Total amount in header and then convenience fees? what is it?, is it included in the total or not? 
- No heading for Payment methods section
### Behavior
- Stop redirecting user suddenly to details.html page without any alert/notification.
- Credit Card Expiry date allows wrong input
- Validation showing cvv invalid error message instead of expiry field. 
### Code quality
- Code has almost no formatting, which significantly impact code readability, should have eslinting rules defined and applied to avoid this.
- Many deprecated events and attributes e.g. `onkeypress`, `<center>` etc.
- Using inline style
- Using `&nbsp;` for indentation
- Duplicate element IDs
- Unused blocks of commented code.
