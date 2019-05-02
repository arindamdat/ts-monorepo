# TS Monorepo
This repository is inspired from Typescript mono-repo. That means, multiple applications can be accomodated within the same repository.
#### Highlights:
This repository uses
- Typescript Project Reference
- Yarn Workspace
### Steps to run the solution:
- cd gudena
- yarn
- yarn run build
- docker-compose up

Now, you can see three containers gudena_command-api, gudena_query-api and gudena_client-app are running.
Browse http://localhost:8082

### Description & History:
This repository started as a R&D on new TS project reference feature along with figuring out a way to efficiently use shared local modules. I first started with referencing shared modules as local packages, later I stopped this approach when I figured out that there are only two ways of using packages:
- Reference with file://package-name
- Publish the package to be further used by other applications. As our packages are not really being used by other application outside the workspace, this approach was not required.

There is another reason for starting with treting shared modules as local packages is, with this approach, it's clearly visible which module is dependent on what just by looking at the package.config of the module under review. 

#### TS project reference:
In this workspace, we took advantage of TS project reference which maintains the build order of different modules by reading the config file. So, using this approach we can entirely get rid of the script where we ourself have written script to build individual packages in sequential order.
Also, we are now NOT treating shared modules as different packages, rather we are referencing those with their "Relative Path". However, this approach has one disadvantage. The disadvantage is explained below and later I also explained it's solution.
##### Disadvantage:
As any developer can reference any shared module by it's relaitve path, it's hard to maintain integrity of the Architecture, where some modules are not supposed to be referenced by some modules. Reference: Gudena Wiki --> Onion Architecture where dependency is always towards the center (inwards).
#### Solution:
We can have an understanding that shared modules will always be referenced with an "alias". So, the developer must define the alias on the tsconfig file of the consumer module. So, just by looking at the tsconfig file the dependencies (on other shared modules) of a particular module will be immediately visible.

#### Few words about Yarn workspace
- The root package.json is supposed to container dev-dependencies required to bootstrap the application
- If a third-party package "x" is required in any module (say, api-query), the command would be like
`yarn workspace api-query add x`