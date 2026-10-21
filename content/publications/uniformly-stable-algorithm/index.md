---
title: "Logarithmic-Free Moment and Generalization Bounds for Uniformly Stable Algorithms"
status: preprint
authors:
  - Thanh Nguyen-Cung
  - Binh T. Nguyen 
venue: Plan Submit to COLT 2027
date:
paper_url: https://arxiv.org/pdf/2608.09870
---

## Research Question

Can the extra $\log n$ factor in moment and high-probability generalization bounds for uniformly stable algorithms be removed without strengthening the assumptions? The paper addresses this upper-bound question posed by [Bousquet, Klochkov, and Zhivotovskiy](https://proceedings.mlr.press/v125/bousquet20b/bousquet20b.pdf).

## Abstract

Uniform stability is a classical tool for controlling the generalization error of a learning algorithm. Bousquet, Klochkov, and Zhivotovskiy \cite{bkz2020} showed that the problem can be reduced to a moment inequality for a sum of weakly interacting functions of independent random variables. Their bound contains an additional factor $\log n$, and they asked whether this factor can be removed. We answer this upper-bound question affirmatively. More specifically, let $Z=(Z_1,\ldots,Z_n)$ have independent coordinates and let $g_i(Z)$ satisfy
$\mathbb{E}[g_i(Z)\mid Z_{-i}]=0,  \|{\mathbb{E}[g_i(Z)\mid Z_i]}\|\le M,$ for every $i = 1, \ldots, n,$
where $Z_{-i}$ denotes all coordinates except $Z_i$. Assume additionally that changing any coordinate $Z_j$, $j\neq i$, changes $g_i$ by at most $\beta$, we prove that, for every $p\ge2$,

$$
\left\\|\sum_{i=1}^n g_i(Z)\right\\|_{L_p}
\le 16pn\beta+M\sqrt{2pn}.
$$

This removes the $\log n$ factor from the previous bound and matches the lower bound of Bousquet, Klochkov, and Zhivotovskiy up to universal constants in the range covered by their construction.
Our proof first establishes the required estimate on the Rademacher cube, then transfers it to arbitrary product distributions by a two-copy randomization argument.

## What This Paper Does

**Approach.** The paper decomposes each summand into an independent fluctuation and a doubly centered interaction. It controls the interactions through exponential moments on the Rademacher cube, with a fixed-point counting argument replacing the multiscale decomposition responsible for the previous logarithmic loss. A two-copy randomization then extends the estimate to arbitrary product distributions

**Main result.** Under the conditional-centering assumptions, with conditional-mean bound $M$ and cross-coordinate sensitivity $\beta$, the paper proves

$$
\left \\| \sum_{i=1}^n g_i(Z)\right\\|_{L_p} \le 16pn\beta+M\sqrt{2pn}
$$

for every $ p\ge2$. This matches the existing moment lower bound up to universal constants for $\kappa\le p\le n$, where $\kappa$ is an absolute constant. For a $\gamma$-uniformly stable learner trained on \$n\$ i.i.d. observations with loss \$0\le\ell\le L\$, it yields $$ \|R(A_S)-R_{\mathrm{emp}}(A_S) \|\lesssim \gamma \log(e^2/\delta) + L\sqrt{\log(e^2/\delta)/n}$$ with probability at least $1-\delta$.

**Why it matters.** Understanding how algorithmic stability controls the gap between empirical and population risks is a central question in statistical learning theory. By eliminating an unnecessary $\log n$ factor, this work establishes a sharper high-probability generalization bound of $O(\gamma\log(e/\delta)+L\sqrt{\log(e/\delta)/n})$ without imposing stronger assumptions, advancing our theoretical understanding of stability generalization.

## My Contribution

- **Resolved an open problem in statistical learning theory** by eliminating the unnecessary $\log n$ factor in moment bounds for weakly interacting random variables, establishing sharp bounds matching known lower bounds up to universal constants in the applicable regime.
- **Developed a novel concentration analysis** combining double-centering, exponential-moment estimates, fixed-point counting on the Rademacher cube, and two-copy randomization to establish logarithmic-free moment inequalities for general product distributions.
- **Established improved high-probability generalization bounds** for uniformly stable learning algorithms, achieving $O(\gamma\log(1/\delta)+L\sqrt{\log(1/\delta)/n})$ without additional assumptions, thereby removing the logarithmic dependence on sample size.
