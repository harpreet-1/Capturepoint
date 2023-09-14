import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function ProductFilters({ setFilters, filters, sortState, setSortState }) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const categories = ["Laptop", "Camera", "Headphone", "Case"];
  const brand = ["Acer", "Asus", "Sony", "Bose", "NZXT"];
  const PriceFilterForm = useRef();

  function handlePriceFilter() {
    let minValue = PriceFilterForm.current.minPrice.value;
    let maxValue = PriceFilterForm.current.maxPrice.value;
    setFilters((prev) => ({
      ...prev,
      minprice: minValue,
      maxprice: maxValue,
    }));
    setShowOffcanvas(false);
  }

  function handleResetFilter() {
    setFilters((prev) => {
      const { minprice, maxprice, ...rest } = prev;
      return rest;
    });

    PriceFilterForm.current.minPrice.value = "";
    PriceFilterForm.current.maxPrice.value = "";
    setShowOffcanvas(false);
  }

  const updateFilter = (filterKey, filterValue) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      const index = updatedFilters[filterKey].indexOf(filterValue);
      if (index === -1) {
        updatedFilters[filterKey].push(filterValue);
      } else {
        updatedFilters[filterKey].splice(index, 1);
      }
      console.log(updatedFilters);
      return updatedFilters;
    });
    setShowOffcanvas(false);
  };

  const handleSortClick = (value) => {
    if (sortState === null) {
      setSortState(value);
    } else if (sortState === "price") {
      setSortState("-price");
    } else if (sortState === "-price") {
      setSortState(null);
    }
  };
  return (
    <Navbar key={"xl"} expand={"xl"} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand>
          <h4 onClick={() => setShowOffcanvas(true)}>Filter </h4>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setShowOffcanvas(true)}
          aria-controls={`offcanvasNavbar-expand-${"xl"}`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"xl"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"xl"}`}
          placement="end"
          show={showOffcanvas}
        >
          <Offcanvas.Header>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"xl"}`}>
              Filter & Sort
            </Offcanvas.Title>
            <Button variant="secondary" onClick={() => setShowOffcanvas(false)}>
              Close
            </Button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              <NavDropdown
                title="Brand"
                id={`offcanvasNavbarDropdown-expand-${"xl"}`}
              >
                <div>
                  {brand.map((brand) => (
                    <Form.Check
                      checked={filters.brand.includes(brand)}
                      key={brand}
                      onChange={(e) =>
                        updateFilter("brand", e.target.labels[0].innerText)
                      }
                      type="checkbox"
                      id={`brand${brand}`}
                      label={brand}
                    />
                  ))}
                </div>
              </NavDropdown>
              <NavDropdown
                title="Category"
                id={`offcanvasNavbarDropdown-expand-${"xl"}`}
              >
                <div>
                  {categories.map((category) => (
                    <Form.Check
                      checked={filters.category.includes(category)}
                      key={category}
                      onChange={(e) =>
                        updateFilter("category", e.target.labels[0].innerText)
                      }
                      type="checkbox"
                      id={`cat${category}`}
                      label={category}
                    />
                  ))}
                </div>
              </NavDropdown>
              <NavDropdown
                title="Price"
                id={`offcanvasNavbarDropdown-expand-${"xl"}`}
              >
                <div>
                  <form
                    id="priceFiletrForm"
                    ref={PriceFilterForm}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      className="form-control"
                      id="minPrice"
                      required
                      placeholder="Minimum"
                      type="number"
                    />

                    <input
                      className="form-control"
                      id="maxPrice"
                      required
                      placeholder="Maximum"
                      type="number"
                    />

                    <button
                      type="button"
                      style={{ background: "#f0461c" }}
                      className="resetpricefilterbtn"
                      onClick={handlePriceFilter}
                    >
                      Apply
                    </button>

                    <button
                      type="button"
                      className="resetpricefilterbtn"
                      onClick={handleResetFilter}
                    >
                      Reset
                    </button>
                  </form>
                </div>
              </NavDropdown>
            </Nav>
            <Nav>
              <button
                className={`btn btn-primary ${sortState ? "active" : ""}`}
                onClick={handleSortClick}
              >
                Sort by Price
              </button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default ProductFilters;
