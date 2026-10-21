---
title: "Inertia-Sensitive Kreiss Bounds for $J$–Selfadjoint Matrices"
status: under-review
authors:
  - Thanh Nguyen-Cung
  - Binh T. Nguyen 
date: 2025-03-01
venue: Linear Algebra and Its Application 
paper_url: https://arxiv.org/pdf/2608.29823
---

## Research Question

For matrices selfadjoint with respect to an indefinite metric, can the dimension factor in the Kreiss bound be replaced by a smaller quantity determined by the metric inertia and minimal polynomial?

## Abstract

Let $A\in\mathbb{C}^{n\times n}$ have spectrum in the closed unit disk. Its maximal power growth $\mathcal{M}(A):=\sup_{k\ge0}\\|{A^k}\\|$ measures transient amplification, whereas the Kreiss constant $\mathcal{K}(A):=\sup_{|z|>1}(|z|-1)\\|{(zI-A)^{-1}}\\|$ measures the corresponding resolvent growth outside the disk. The classical finite-dimensional Kreiss theorem gives $\mathcal{M}(A)\le en\mathcal{K}(A)$, and the linear dependence on $n$ is unavoidable for general matrices. We show that, for matrices selfadjoint with respect to an indefinite metric, the ambient dimension $n$ can be replaced by an effective dimension determined by the minimal polynomial and the inertia of the metric. Specifically, if $A^*J=JA$, where $J$ is a fundamental symmetry with inertia $(n-q,q)$, then $\mathcal{M}(A) \le e\min\\{d(A),2q+1,2(n-q)+1\\}\mathcal{K}(A),$ where $d(A)$ is the degree of the minimal polynomial. Our proof requires no assumption on diagonalizability or reality on the spectrum. Instead, we associate each cyclic orbit with a finite-rank selfadjoint Hankel operator and transfer its rank and inertia to a coefficient estimate. Examples based on scaled nilpotent shifts show that the linear dependence on the smaller inertia index is asymptotically sharp, even when this index is negligible relative to the matrix size and $d(A)=n$. We also obtain scaled-disk decay estimates and weighted-norm extensions to arbitrary nonsingular Hermitian metrics.

## What This Paper Does

**Approach.** The paper represents each cyclic matrix orbit through a finite-rank selfadjoint Hankel operator $H_\rho=W_\rho^*JW_\rho$, whose rank and inertia inherit constraints from the original matrix and metric. It develops a coefficient estimate that converts these structural constraints, together with resolvent bounds, into bounds on matrix powers. Scaled nilpotent shifts provide examples establishing sharpness.

**Main results.** For $A^\*J=JA$, where $J=J^*=J^{-1}$ has inertia $(n-q,q)$ and $A$ has spectrum in the closed unit disk, the paper proves 
$$\mathcal M(A)\le \mathrm{e}\min\\{d(A),2q+1,2(n-q)+1\\}\mathcal K(A).$$
Here, $\mathcal M(A)=\sup_{k\ge0}\|A^k\|_2$, $\mathcal K(A)$ is the Kreiss resolvent constant, and $d(A)$ is the minimal-polynomial degree. It also establishes geometric-decay estimates and weighted-norm extensions to general nonsingular Hermitian metrics. Constructed examples asymptotically attain the bound even when $q=o(n)$ and $d(A)=n$, demonstrating that the inertia improvement is both genuine and asymptotically sharp.  

## My Contribution

- Construct and prove the whole paper including Hankel operator lemmas, the main theorem about Kress constant and construct the family of matrix that prove the bound of the main theorem is sharp
