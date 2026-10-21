---
title: "Gaussian Sharp Mean Estimation under Finite Covariance in Fixed Dimension"
# date: 2026-10-21T05:38:03+07:00
draft: false 
status: under-review 
authors:
  - Thanh Nguyen-Cung 
  - Binh T. Nguyen
venue: AISTATS 2027 
paper_url: AISTATS_manuscript.pdf
---

## Research Question

Can a robust estimator of a multivariate mean match the Gaussian sample mean’s optimal leading confidence-radius constant under only finite, unknown covariance? The paper asks whether this is achievable uniformly over distributions, with polynomial-time computation, when dimension is fixed and 
$L = \log(1\\delta) \to \infty $ while $L/n \to 0$.  

## Abstract

We study estimation of the mean of an arbitrary Borel probability distribution on $\mathbb R^d$,
assuming only that its covariance $\Sigma$ is finite. For every fixed dimension $d$, we construct a
Borel measurable estimator that may depend on the target confidence level. Its Euclidean error
matches the Gaussian sample-mean benchmark up to a relative factor $1+o(1)$ in the high-confidence
regime. Writing $L=\log(1/\delta)$ and letting $\mathcal Q_\delta(\Sigma)$ denote the upper $\delta$-quantile of $\left\lVert Z\right\rVert$ for $Z\sim\mathcal N(0,\Sigma)$, we prove
$$
\mathbb P\left\\{\|\widehat\mu-\mu\|>\left[1+O_d\left(\frac{\log L}{L}+\frac{L}{n}\right)\right]\frac{\mathcal Q_\delta(\Sigma)}{\sqrt n}\right\\}\le\delta
$$
whenever $L$ is sufficiently large and $L/n$ is sufficiently small. The guarantee holds uniformly
over all distributions with finite covariance, including those whose covariance $\Sigma$ is singular
or arbitrarily ill-conditioned, and the estimator requires no knowledge of $\Sigma$. For Gaussian
observations, $\mathcal Q_\delta(\Sigma)/\sqrt n$ is the exact confidence radius of the sample
mean, and a lower bound based on two Gaussian location models shows that this benchmark is optimal
to first order. Our estimator is computable in polynomial time for every fixed $d$, using
$n^{O(d^5)}$ arithmetic operations and comparisons.

## What This Paper Does

**Approach.** The paper constructs a confidence-dependent estimator by testing candidate means and covariance bounds using a quadratic likelihood. An exact reverse-KL representation links accepted candidates to a common empirical distribution; a multivariate Chernoff-divergence bound and Helly’s theorem then establish that their confidence balls share a common intersection. The estimator is the minimum-norm point in this intersection. 

**Main result.** With probability at least $1-\delta$, the estimator's Euclidean error is at most
$
\left[1+O_d\left(\frac{\log L}{L}+\frac{L}{n}\right)\right]\frac{\mathcal Q_\delta(\Sigma)}{\sqrt{n}}
$
where $\mathcal Q_\delta(\Sigma)$ is the upper-tail $\delta$-quantile of $\lVert Z\rVert$ for $Z\sim\mathcal{N}(0,\Sigma)$. This guarantee holds uniformly under finite covariance, including singular and arbitrarily ill-conditioned matrices, without knowing $\Sigma$. A Gaussian lower bound establishes first-order optimality, and the estimator is computable using $n^{O(d^5)}$ arithmetic operations and comparisons for fixed $d$.

**Why it matters.** Mean estimation is one of the most fundamental problems in statistics, plays a central role in uncertainty quantification and machine learning. A fundamental challenge is to construct estimators that retain strong statistical guarantees under minimal distributional assumptions, particularly in the presence of heavy-tailed data. In this work, we show that robust mean estimation can attain asymptotically sharp, Gaussian-level accuracy under the sole assumption of finite covariance. Our results establish that such accuracy is achievable without additional distributional regularity, providing a sharper characterization of the statistical limits of mean estimation.

## My Contribution
- Constructed a robust multivariate mean estimator under finite, unknown covariance and proved that it attains the Gaussian confidence radius up to a $1+o(1)$ factor in the fixed-dimension, high-confidence regime, together with a matching first-order lower bound.

- Developed the quadratic-likelihood framework, its finite-covariance calibration, and its reverse-KL representation, and proved a multivariate Chernoff-divergence bound that enables a geometric intersection construction without a fixed loss in the leading constant.

- Designed an exact algorithm using polynomial representations, quantifier elimination, and semialgebraic optimization, and established an $n^{O(d^5)}$ arithmetic complexity bound for every fixed dimension.
