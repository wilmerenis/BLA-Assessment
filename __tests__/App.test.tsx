import * as React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("<App>", () => {
	test("Should render App", () => {
		render(<App />);
		expect(screen).toMatchSnapshot();
	});
});
