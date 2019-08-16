# Bamazon
This is a CLI application that specializes in the sale of health foods that can be used to make fresh juice or salads. 

## Customer Side
It includes a customer side in which a user can view what items are offered and their costs, and will show a total upon ordering.   After the order confirmation, the user will again be prompted if he/she would like to make another order.
![Image of customer side](/images/customer-1.PNG)
If the inventory cannot cover the order, the user will be told so and asked to order a different amount or another item.
![Image of lack of inventory](/images/customer-2.PNG)

## Manager Side
The manager side includes a menu that offers 4 choices:
    **1. Products for Sale**
        - This allows the manager to see what items are in the inventory, and how many of each item there are.
        ![Products for Sale image](/images/products-for-sale.PNG)
    **2. View Low Inventory**
        - Selecting this option will allow the manager to see only the items which have less than 5 in inventory.
        ![Low inventory](/images/low-inventory.PNG)
    **3. Add to Inventory**
        - Selecting this option will allow the manager to add quantities to items already in inventory.
        ![Add to inventory](/images/add-to-inventory.PNG)
        - After adding items, the updated *Products for Sale* table will be displayed.
        ![20 spinach added](/images/spinach.PNG)
    **4. Add New Product**
        - Selecting this option will allow the manager to add a new item to the inventory.
        - The manager will be prompted for the name of the item, then given a department choice of either *fruits* or *vegetables*. 
        - Lastly, the manager will create the price for the customer.
        ![Add new product](/images/add-new-product.PNG)
        -Now the new inventory list is printed.
        ![New list printed](/images/kale.png)

### Two popular juice recipes:
    **1. Green Juice (about 1/2 gallon)**
        - 5 stalks of celery
        - 5 cucumbers
        - 2 lemons
        - 1 apple
    **2. Beet/Carrot Juice**
        - 20 carrots
        - 6 large beets
        - 2 lemons
        - As much garlic as you desire :)

