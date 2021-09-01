# CONTRIBUTING
First of all we want to say **Thank You❤** for taking the time to support our project.

## Introduction
The following is a set of guidelines and rules to contribute to open-source projects, published by [Surplex](https://github.com/surplex).
Feel free to propose changes to this document.

The key words **"MUST"**, **"MUST NOT"**, **"REQUIRED"**, **"SHALL"**, **"SHALL NOT"**, **"SHOULD"**, **"SHOULD NOT"**, **"RECOMMENDED"**, **"MAY"**, and **"OPTIONAL"** in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).


## Table of Contents
* [Introduction](#introduction)
* [Table of Contents](#table-of-contents)
* [Styling Guide](#styling-guide)
  * [Coding Standards](#coding-standards)
  * [Branching Model](#branching-model)
* [Testing](#testing)
* [Pull Requests](#pull-requests)
  * [Labels](#labels)
  * [Reviewer](#reviewer)
  * [Assignee](#assignee)
* [Questions](#questions)

## Style Guide
To keep our project **consistent** and **clean**, every contributor **MUST** follow the rules and guidelines.

### Coding Standards
The coding standards/conventions are usually defined in the README.md. If they do not exist, these fallback rules will apply:
#### Default
* Comments **MUST** be written in **English**.
* The names of **structures**, **individual types**, **enums**, **classes**, **methods**, **variables**, **functions**, **properties** and **namespaces** **MUST** be written in **English**.
* Magic Numbers **SHOULD NOT** be used. 
* The Name of a function or method **SHOULD** be descriptive.
* Basically these principles **SHOULD** be used: Single Responsibility Principle, Open-Closed Principle, Liskov Substitution Principle, Interface Segregation Principle, Dependency Inversion Principle, YAGNI and KISS.

#### PHP
Since other people have already thought about guidelines, the proposal is to adopt the guidelines from [PSR-12](https://www.php-fig.org/psr/psr-12/). [PSR-12](https://www.php-fig.org/psr/psr-12/) complements [PSR-1](https://www.php-fig.org/psr/psr-1/) and [PSR-2](https://www.php-fig.org/psr/psr-2/), so these two **MUST** also be considered.
In addition, the following rules **MUST** be observed:
* Classes **MUST** be written in **PascalCase** and set up according to [PSR-4](https://www.php-fig.org/psr/psr-4/) to ensure autoloading.
* Variable names and method names **MUST** be written in **camelCase**.

### Branching Model
For our project we use the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) Model which is introduced by Vincent Driessen.
We extended the branching model by separating bugfixes from features.
To commit a bugfix you **MUST** use the new branch type called **Bugfix** which is indicated by the prefix *bugfix/*.

## Testing
To avoid unexpected behavior of the software we maintain and use automated tests.
* Every change or implementation **MUST NOT** break any tests. When a test fails, the test or the code letting the test fails **MUST** be adjusted.
* Every implementation of a new feature **MUST** have at least one unit test.
* Every bugfix **SHOULD** have at least one test which tests this case.

## Pull Requests
Each pull request **SHOULD** have the develop branch as it target branch and should conform the requirements described above.

### Labels
To sort your pull request correctly, it **MUST** use the available labels.
**Bug** - Use this label if you have a bugfix or bug report.
**Documentation** - Use this label if you have a improvement or addition to documentation.
**Duplicate** - This label is used by the members of the organization to identify duplicates.
**Feature** - Use this label if you have a new feature or an idea for a new feature.
**Question** - Use this label if you have a question.

### Reviewer
Reviewers will be automatically assigned to your pull request.
You can put your feet up and wait for your pull request to be accepted ;)

## Questions
If you have questions about one of our open-source projects, then feel free to write an issue.
If this is a general question that doesn't relate to an open source project, then write us a mail to [github@surplex.com](mailto:github@surplex.com).
