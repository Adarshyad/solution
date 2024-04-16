// will reassign when items get removed
let products = [];
// will reassign when items get removed
let cart = [];

function addOrIncrease(item, targetContainer, equality = (i) => i.id) {
  let match = targetContainer.find(i => equality(item) === equality(i));
  if (match) {
    match.qty += item.qty;
  } else {
    // didn't find so it gets added to whichever container
    targetContainer.push(item);
  }
}

// Gets the value of the elementId or a defaultValue
function getValue( elementId, defaultValue ) {
  let elem = document.getElementById( elementId );
  if (!elem || !elem.value) {
    return defaultValue;
  }
  return elem.value;
}

// resets the value for an inputfield
function resetValue( elementId ) {
  let elem = document.getElementById( elementId );
  elem && (elem.value = null);
}

// adds a product to the list
function addProduct() {
  let product = {
    id: getValue('productId', ''),
    description: getValue('productDescription', ''),
    qty: parseInt(getValue('productQty', 1)),
    price: parseFloat(getValue('productPrice', 0))
  };
  if (product.id === '') {
    alert('Please enter a product id');
    return;
  }
  addOrIncrease( product, products );
  resetValue( 'productId' );
  resetValue( 'productDescription' );
  resetValue( 'productQty' );
  resetValue( 'productPrice' );
  renderProducts();
}

// adds an item to the cart
function addToCart(itemId) {
  var product = products.find( p => p.id === itemId );
  if (!product) {
    alert('Couldn\'t find product');
    return;
  }
  addOrIncrease( product, cart );
  renderCart();
}

// removes an item from the cart
function removeFromCart(itemId) {
  cart = cart.reduce( (current, item) => {
    if (item.id !== itemId) {
      current.push(item);
    }
    return current;
  }, []);
  renderCart();
}

// removes an item from the products list
// while simultanously removing it from the shopping cart (as it is no longer in the product list)
function removeFromProducts(itemId) {
  products = products.reduce( (current, item) => {
    if (item.id !== itemId) {
      current.push(item);
    }
    return current;
  }, []);
  renderProducts();
  // remove it from the cart, as it is no longer in the products list
  removeFromCart(itemId);
}

// renders the products to the table
// will re-render the full table each time
function renderProducts() {
  createTable('products', products, [{
      title: 'id',
      field: 'id',
      class: 'left'
    },
    {
      title: 'description',
      field: 'description',
      class: 'left'
    },
    {
      title: 'quantity',
      field: 'qty',
      class: 'right'
    },
    {
      title: 'price',
      field: 'price',
      class: 'right'
    },
    {
      title: 'total',
      value: (i) => i.price * i.qty,
      class: 'right',
      template: '%0'
    },
    {
      title: 'action',
      field: 'id',
      class: 'center',
      template: '<button type="button" onclick="removeFromProducts(\'%0\');">Remove product</button>' +
        '<button type="button" onclick="addToCart(\'%0\');">Add to cart</button>'
    }
  ]);
}

// renders the cart to the cart table
// will rerender each time called
function renderCart() {
  createTable('cart', cart, [{
      title: 'id',
      field: 'id',
      class: 'left'
    },
    {
      title: 'description',
      field: 'description',
      class: 'left'
    },
    {
      title: 'quantity',
      field: 'qty',
      class: 'right'
    },
    {
      title: 'price',
      field: 'price',
      class: 'right'
    },
    {
      title: 'total',
      value: (i) => i.price * i.qty,
      class: 'right',
      template: '%0',
      calculateTotal: true
    },
    {
      title: 'action',
      field: 'id',
      class: 'center',
      template: '<button type="button" onclick="removeFromCart(\'%0\');">Remove</button>'
    }
  ]);
}

/* Helper function to create a table dynamically */
/* Taken from: https://stackoverflow.com/questions/43924509/creating-an-html-table-using-javascript-and-json/43925208#43925208 */
function createTable(target, data, columns) {
  // gets the elements required based on id for the target div
  // and creates the table, thead, tbody & tfoot for the table
  let element = document.getElementById(target),
    table = document.createElement('table'),
    thead = document.createElement('thead'),
    header = document.createElement('tr'),
    tbody = document.createElement('tbody'),
    tfoot = document.createElement('tfoot'),
    // totals is used for the totals for the footer
    totals = {};

  // creates the header
  for (const column of columns) {
    // and creates the cells in the header, adding title and class
    let cell = document.createElement('td');
    cell.innerHTML = column.title;
    cell.className = column.class;
    header.appendChild(cell);
  }
  thead.appendChild(header);

  for (const item of data) {
    // creates the single rows
    let row = document.createElement('tr');
    for (const column of columns) {
      // and for each column creates the cell itself
      let cell = document.createElement('td');
      let value;
      // checks what to display
      if (column.field) {
        // only a property on the data
        value = item[column.field];
      } else if (column.value) {
        // a function with a callback value
        value = column.value(item)
      }
      // if it should calculate totals, it will do so here
      if (column.calculateTotal) {
        // in case the column is unknown, it's initialized as 0
        // warning: all values will be whole numbers
        totals[column.field] = (totals[column.field] || 0) + parseInt( value );
      }
      // if it has a template, we will replace the %0 with value
      // this template function supports only 1 value to be "templated"
      if (column.template) {
        value = column.template.split('%0').join(value);
      }
      // set the cell value
      cell.innerHTML = value;
      // set the class (used to align, for example)
      cell.className = column.class;
      // add cell to row
      row.appendChild(cell);
    }
    // add row to tbody
    tbody.appendChild(row);
  }
  // empty object would mean false, so only if totals needed to be calculated
  // would it create the footer here
  if (totals && data.length > 0) {
    let row = document.createElement('tr');
    for (const column of columns) {
      let cell = document.createElement('td'), value = '';
      if (column.calculateTotal) {
        value = totals[column.field];
        if (column.template) {
          // can still use the row template
          value = column.template.split('%0').join(value);
        }
      }
      cell.innerHTML = value;
      cell.className = column.class;
      row.appendChild( cell );
    }
    tfoot.appendChild( row );
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(tfoot);
  // clear the target element
  element.innerHTML = '';
  // set the table on the target element
  element.appendChild(table);
}

// start of the application, create the 2 tables
// and then it's up to the user
renderProducts();
renderCart();