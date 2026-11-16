---
title: "Why it’s time to stop coding by hand"
description: "AI coding tools are now mature enough to retire hand-coding in commercial work. The case for the shift, and rebuttals to the five most common objections."
date: 2026-11-16
tags: [ai, careers]
summary:
  - "Like the compiler in 1957, AI coding tools let programmers move up a level of abstraction and deliver far more ambitious software."
  - "The models and harnesses have been mature enough to deliver quality code since at least late 2025, in the hands of a senior engineer using the right technique."
  - "The time saved generating code can be spent on planning, testing, documentation and review, so the quality bar for a solution should be reset."
  - "Every common argument against AI coding (quality, skill atrophy, maintainability, security, vendor lock-in and cost) is legitimate, and every one is solvable."
---

With the introduction of AI coding tools, we’ve reached an inflection point in software development. The response from the global coding community has been extremely varied, from engineers who have completely entered the AI-powered matrix, running swarms of coding agents, racking up a collection of ambitious projects, to those who reject AI coding as a matter of principle, still choosing to search the cobweb-covered StackOverflow rather than sell out to the evil, AI billionaire overlords.

In this article I will make the case that now is the time to fully embrace AI coding tools for building software, and retire the hand coding. We’ll cover the benefits of this path and attempt to rebut the most common arguments against AI coding, with a small carve-out for the preservation of handcoding as a craft in its own right.

## Why now is the time

In early 1957 there were a few thousand programmers in the world, coding exclusively in Assembly. In April that year IBM released FORTRAN. That changed everything. Hand-written assembly was considered a craft, and experts insisted a compiler could never match their output. The industry's name for compilers at the time was literally "automatic programming". Within a decade, hand-writing machine code was a niche skill, and the valuable work was transformed; algorithm design, program structure and understanding what the machine was actually doing when things went wrong.

The invention of the compiler allowed the programmer to move up a level of abstraction. Development speed greatly increased as did the sophistication of software delivered. While not a perfect analogy, many of the same dynamics apply to the current era. AI coding tools, a form of “automatic programming” if you will, has rendered hand-coding largely unnecessary and allowed programmers to move up a level of abstraction and deliver exceedingly more ambitious software than they could have previously imagined.

## The tools are ready

The models and harnesses have matured to the point where a senior engineer can utilise them to complete any coding project. While the right technique is required, the tools have been mature enough for at least 12 months (since at least late 2025) to deliver quality code every time. The models themselves, trained on vast quantities of code and technical documentation, can offer a wider variety of solution options than even the most experienced engineer could realistically contemplate. However, just as importantly, the model harnesses have matured in their handling of multiple agents, research capabilities and built-in guardrails for security, testing, safety and documentation.

Coding agents support integrations, via MCP & CLI, to nearly any supporting service, including project management, logging, cloud services, monitoring and communication services, facilitating rapid research, collaboration, debugging and delivery. The harnesses ship with modes for code review, security review and easily handle performance optimisation, with minimal guidance to ensure the desired outcomes are known. In the hands of experienced engineers, they provide engineering leverage that could barely have been imagined just a few years ago.

## The speed is incomparable

By crafting your prompts, tool choices, inputs and harness modes, an engineer can build new features, refactor code and debug issues at incredible speed. Thousands of lines of code can be generated within minutes with comprehensive unit tests and thorough code review processes run; a development velocity orders of magnitude faster than any human could attempt.

Not only that, your coding agent can assist in debugging by digesting thousands (if not millions) of log entries, analysing infrastructure datapoints, reading customer bug reports and reviewing relevant source code to solve complex production bugs in record time. The manual version of this process is vastly slower, even more so if the volume of log entries requiring analysis is especially daunting.

The difference in speed between using coding agents and coding by hand is so extreme, it can’t be ignored. A suitable metaphor may be the difference between walking between cities and catching a bullet train. If you need to travel to another city, and those are your transport options, you would need some compelling reasons to choose to walk.

## Broader solution options

In the past, when architecting your software solutions, you would inevitably draw upon your previous experience and familiar technologies. In some cases you may intentionally consider an unfamiliar technology that is particularly well suited to the problem space, acknowledging that there would be an onboarding cost to do so.

In the AI era, these constraints are largely removed. Using your agents to research and iterate on possible solution ideas can expose you to possibilities you may never have previously considered. Where necessary, those solution options can be closely analysed, even tested and prototyped. With the time to generate code so drastically compressed there is more room for thorough planning, testing and architecture upfront, knowing that once you have settled on the preferred option, the code delivery for that option may well be the fastest part of the overall project.

New (to you) technologies can be confidently selected as the onboarding cost is drastically reduced. Maybe you have never used Rust, but you have C or Go experience. By allowing your agent to handle the syntax, setup and ecosystem configuration, you can apply higher level skills in understanding application structure, data contracts, performance principles, etc to deliver solutions using unfamiliar languages and tools, translating relevant experience across specific technologies. With technology and time constraints reduced and rapid access to varied solution options, delivering a higher quality project is easily within reach.

## More ambitious projects

Recently, I was refactoring a function in Typescript that transformed multiple complex datasets into a new structure to support comparison between them. I knew upfront that performance was going to be an important consideration and the approach taken could significantly alter the outcome. I started with a prompt to describe the goal, the current state and the performance considerations. The agent produced 3 versions of the function and then ran test simulations with large, seeded datasets with varying levels of difference between each. This was to understand the impact of comparing similar and non-similar datasets. After 100 test runs x 3 function versions x 5 dataset versions, the most performant option was obvious. After building comprehensive unit tests, the agent opened a PR with the description outlining the test results. The PR also linked out to an external document with a comprehensive description of the performance testing. I then asked the agent to create a HTML summary of the outcomes of the work for a non-technical stakeholder who wanted assurance that the performance outcomes had been properly considered. All of this was achieved in well under an hour, a fraction of the time it would have taken without any AI agent support.

The main point here is that by using a coding agent you can be far more ambitious about the quality of solution you deliver. While all of the above can be achieved manually, the time taken to do so would make such a thoroughly performance-tested solution impractical. And this example is particularly basic. Larger features, more complex solutions, more comprehensive testing and higher quality documentation can be delivered rapidly; the time saved generating code now available for tasks that improve quality. Generate animated diagrams to help the team understand architecture or data flow, have your agent conduct penetration tests, generate a walkthrough video of a new UI to assist customer success staff, simulate heavy traffic to check for race conditions; your agent is a lightning fast engineering squad, put it to good use.

Experienced engineers have developed an instinct for the depth of planning, iteration, test coverage, documentation and review that is achievable within typical time constraints. Now, with AI leverage, these instincts need to be reset and the question asked, “if I had an abundance of time and available dev effort, how could I ensure the current solution is first class?”. Describe your answers to your agent and deliver that first class solution.

## Rebutting the arguments against AI coding

All of the arguments against AI coding are legitimate, however, all of them are solvable. They are absolutely worth solving for the reasons discussed above.

### 1 Quality and correctness risk

You *can* generate bad code using AI coding tools. Poor prompts, lack of context, lower quality models and lack of review all make that possible, however, you can also avoid generating bad code.

Think of your coding agent like an incredibly fast mid-level engineer, that needs very clear guidance on the task and a thorough review of the results.

- Describe the task and the expected results clearly. The more business logic the task requires, the more detail you should provide in your task description
- Use a “plan” mode to review the agent’s understanding of the task and correct it before the build
- Review and iterate on the first version. Instead of being disappointed with the first result, provide feedback and iterate.
- Use security and code review agent skills to catch issues with generated code early.

The more practice you have with piloting coding agents, the more instinct you develop for how to break up tasks and the level of prompt detail required to ensure quality results.

### 2 Skill atrophy and lost understanding

I think everyone who has dived into agent-driven coding has had at least a twinge of fear that their hand-coding skills are being lost. It’s a perfectly logical fear, as those skills have been essential in software engineering until now. There are 3 reasons why I believe this is not a blocker to full adoption of agent-driven coding.

1. Reading code is a different skill to writing code. You can maintain the ability to read code, line-by-line, understand what it’s doing and identify opportunities for improvement even while your writing skills remain unused. I’ve learnt this from experience. Writing code requires fluency in syntax and APIs, low-level logic design and token naming. In the AI-era reading code remains valuable, while writing code has moved up a level.
2. The skills required for writing code have changed. Coding line by line no longer makes sense when it can be handled by agents at 100 times the speed. So the valuable skills that engineers apply to writing code is in clearly articulating requirements, solution architecture at higher levels and leaning on the agent capabilities to drive quality.
3. Handing coding skills can be recovered. Like many life skills, if it becomes desirable or necessary to code by hand, those skills can be practiced and polished until they once again become familiar. This isn’t essential to building quality software but that doesn’t mean that rusty hand-coding skills can’t be recovered in future, if needed.

### 3 Maintainability and codebase drift

If AI is writing all our code, who is responsible for the architecture? If we can generate code at such a rapid pace, how will our comprehension of it keep up?

Again, these are legitimate concerns that also have solid solutions. It’s important for engineers and tech leads to maintain their understanding of their application’s architecture to ensure quality over the long term. That understanding should also be communicated as context for AI agents, to ensure new features are consistent with existing code. The speed and confidence that AI agents demonstrate, tempt us to rely too heavily on them for higher level solution engineering. Resist that temptation! Quality outcomes rely on engineers remaining in control of the high level architecture.

For comprehension and long term maintainability, both humans and agents need access to shared documentation. Provide your agent with AGENTS.md (or CLAUDE.md) files that link to more detailed documentation files that cover all the major aspects of your application. Implement codebase rules through hooks, linting and CI actions. Providing the right context will ensure new features fit within your desired architecture.

Then, as you continue to build, have your agents update this documentation and create diagrams that describe new architecture. Lead engineers can use these documents to maintain their understanding of the application, without being familiar with every line of code.

### 4 Security vulnerabilities

Like argument 1 above, security is a genuine concern, as it’s possible that generated code is not properly considering attack vectors or properly sanitising data. However, not only can you avoid delivering vulnerable code, you can use AI agents to more thoroughly test and review your code than you could have previously done.

Here are a few ideas to consider:

- Use the built-in security review commands in your coding agents to specifically task it with identifying potential vulnerabilities
- Ask the agent to plan and run a penetration test
- Ask your agent to review recent published security vulnerabilities against your current package versions. Even better, schedule this check to happen automatically
- Ensure your application documentation (see argument 3 above) properly describes your security measures, sensitive data, RBAC roles, etc, so your agent has clear guidance on how to handle sensitive data and what kinds of segregation are expected
- Give your agent read access to infrastructure and application logs, then have alerts trigger your agent to automatically review current activity to identify and act on potential threats

Proactively deploying your coding agent to enhance your security posture will ultimately improve the security of your application compared to a 100% hand-coded codebase.

### 5 Vendor lock-in and cost

There are already a number of frontier coding harnesses to choose from, all of which are high enough quality to build great software. Switching between providers is easy and many engineers are already using multiple providers at once to cross-check work or to utilise the strengths of specific models. So being locked into a specific provider is more of an issue in large organisations where switching requires procurement and account deployment.

As I write this, the best value options are the various “Max” plans which provide plenty of tokens at a reasonable price. The productivity boost easily justifies the cost.

Many people have shared fears that the frontier providers will soon need to adjust their pricing to stop the huge operating losses. This may be true, however in the meantime, the open-weight models have caught up significantly so an engineering team now has options to rent GPUs and deploy their own models, use gateways like OpenRouter to access open-weight models or even buy their own GPUs. The best solution would depend on the size of the team.

The short version is; the benefits are far too large to let the fear of future AI market changes prevent you taking advantage of the technology now.

## Conclusion

Just before I tell you to retire your hand-coding and delete your IDE, it must be said that choosing to write code by hand for the joy of it is a perfectly legitimate craft. I still enjoy the process of coding by hand and completely understand engineers creating hobby projects where they hand code their solution for the joy of it.

However, with that said, if you’re coding in commercial settings then it’s time to shift your engineering process; from writing code by hand, line by line to piloting AI coding agents that can generate code at 100 times the speed. Not only that, but as a lightning fast engineering assistant, it can help plan, test, review and document your software at a quality that was previously out of reach.

So the best approach is to put aside those practical excuses and existential fears and embrace a technology shift that can power more ambitious software projects than you’ve ever attempted. Now is the time!
