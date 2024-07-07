import Carousel from "react-bootstrap/Carousel";

function Akcije() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <img
          height={450}
          src="src/images/promocija1.png"
          className="d-block w-100"
          alt="..."
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          height={450}
          src="src/images/promocija2.jpg"
          className="d-block w-100"
          alt="..."
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          height={450}
          src="src/images/promocija3.jpg"
          className="d-block w-100"
          alt="..."
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Akcije;
