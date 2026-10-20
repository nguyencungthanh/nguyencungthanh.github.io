---
title: "Logarithmic-Free Moment and Generalization Bounds for Uniformly Stable Algorithms"
status: preprint
authors:
  - Thanh Nguyen-Cung
  - Binh Nguyen-Tuan
date:
paper_url: https://arxiv.org/pdf/2608.09870
---

## Research Question

For matrices selfadjoint with respect to an indefinite metric, can the dimension factor in the Kreiss bound be replaced by a smaller quantity determined by the metric inertia and minimal polynomial?

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

The paper associates cyclic orbits with finite-rank selfadjoint Hankel operators to obtain inertia-sensitive power-growth bounds. It also constructs asymptotically sharp examples and extends the estimates to scaled disks and weighted norms.

## My Contribution

- Construct and prove the whole paper including Hankel operator lemmas, the main theorem about Kress constant and construct the family of matrix that prove the bound of the main theorem is sharp
