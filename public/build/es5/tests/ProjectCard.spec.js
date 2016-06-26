"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// https://github.com/producthunt/chai-enzyme

var ProjectCard = _interopRequire(require("../components/ProjectCard"));

var _enzyme = require("enzyme");

var mount = _enzyme.mount;
var render = _enzyme.render;
var shallow = _enzyme.shallow;


describe("ProjectCard", function () {
			var project = {
						id: 123,
						title: "First Project",
						description: "Project description",
						tags: ["tag 1", "tag 2"],
						slug: "first-project",
						image: "1234"
			};

			var component = mount(React.createElement(ProjectCard, { project: project }));

			it("shows title and tags", function () {
						var anchors = component.find("a");
						expect(anchors).to.have.length(3);
			});

			it("shows title of project", function () {
						expect(component.find("#title")).to.have.length(1);
						expect(component.find("#title")).to.have.text("First Project");
						expect(component.find("#title")).to.have.attr("href").equal("/project/first-project");
			});

			it("shows description of project", function () {
						expect(component.find("#description")).to.have.length(1);
						expect(component.find("#description")).to.have.text("Project description");
			});

			it("shows image of project", function () {
						expect(component.find("img")).to.have.length(1);
						expect(component.find("img")).to.have.attr("src").equal("https://media-service.appspot.com/site/images/1234?crop=260");
			});
});