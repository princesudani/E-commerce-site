import { shallow } from "enzyme";
import React from "react";
import App from "./App";

//========= one component Test ==========//
// describe("Given App", () => {
//   test("NavBar is render properly", () => {
//     const component = shallow(<App />);
//     console.log(component.debug());
//     const navBarExist = component.find("Navbar").exists();
//     expect(navBarExist).toBe(true);
//   });
// });

//========= multiple component Test ==========//
// npm install --save-dev enzyme-to-json
// Add this line in packege.jscn file from last after devDependency
// "jest":{"snapshotSerializers": ["enzyme-to-json/serializer"]}

describe.skip("Given App", () => {
  test("THEN NavBar is render properly", () => {
    const component = shallow(<App />);
    console.log(component.debug());
    expect(component).toMatchSnapshot();
  });
});
