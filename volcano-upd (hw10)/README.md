# Homework 10
We now want to enrich the data we are holding in the payment records, and add extra functionality to our Volcano coin.

We want to allow users to add / update details to the payment records in a second transaction after the initial transfer has completed.

* Payments can be of 5 types:
  * Unknown
  * Basic payment
  * Refund
  * Dividend
  * Group payment

1. Add fields to the payment record for:
* A payment identifier, this should be unique but human readable.
* A timestamp
* The type of payment (see above)
* A comment

2. Update the transfer function to fill in these fields, initially the payment type will be Unknown, and the comment field blank.

3. Write a new function to allow a user to view all the details for the payments that they have made.

4. Write a function to allow the user to update a particular payment with the payment type and comment, they will need to specify the identifier, payment type and comment.

5. Make sure you check the parameters in these functions for validity.

6. Create a address variable for an administrator, this will be set at deploy time.

7. The administrator should have the ability to update the type of payment for any payment record from any user. Write a function, or change the existing one, to allow this.

8. If the administrator updates a payment record the existing comment should have “updated by” plus the administrators address appended to it.
