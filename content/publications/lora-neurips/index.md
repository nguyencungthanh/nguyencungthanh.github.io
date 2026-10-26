---
title: "How Finite-Rank Bottleneck Shape the Low-Rank Adaptation Landscape"
status: published
authors:
  - Long Nguyen-Chi
  - Quynh Nguyen
  - Thanh Nguyen-Cung
  - Binh T. Nguyen
venue: NeurIPS 2026
date: 2026-09-24
paper_url: https://arxiv.org/pdf/2610.23343
---

## Research Question

When can low-rank updates achieve the same optimum as unrestricted-rank, trace-norm-regularized adaptation of a pretrained network, without linearizing the network? The paper asks how frozen-feature geometry and attention structure determine sufficient update ranks and constrain the nonconvex optimization landscape of LoRA

## Abstract

Low-rank adaptation (LoRA) has become the standard method for parameter-efficient fine-tuning of large pretrained models, yet theoretical explanations for why low-rank updates suffice remain incomplete. Most existing analyses rely on the Neural Tangent Kernel (NTK) regime, which linearizes the network around the pretrained weights. In this work, we take a different approach that requires no linearization: our key observation is that, once the backbone is frozen, the loss sees each adapted weight matrix only through a finite-rank linear map induced by the frozen activations. Trace-norm regularization then forces the optimizer to pick a low-rank matrix among all matrices that produce the same observed output. This yields global minimizers whose ranks are controlled by the rank of this map, which we call the *bottleneck rank*, rather than the sample size. For multi-head attention, we obtain tighter rank upper bounds by exploiting two additional invariances: row-wise softmax is insensitive to additive row constants in the score matrix, and value updates are observable only after attention weighting and frozen output projection. For the factorized LoRA objective with weight decay, we prove a complementary result on the nonconvex side: after an arbitrarily small generic positive semidefinite perturbation, every first-order stationary point is rank-deficient once the LoRA rank exceeds a threshold determined by the bottleneck rank. Finally, we show that global minimizers of the perturbed objective are near-optimal for the original trace-norm problem, and we provide uniform generalization bounds governed by the spectral structure of the frozen features.

## What This Paper Does
**Approach.** The paper observes that the training loss sees an adapted matrix $T$ only through a finite-rank linear map, such as $\Phi(T)=TH$, where $H$ contains the input features. It combines nuclear-norm regularization with semidefinite lifting and rank-reduction arguments to identify low-rank updates that preserve the observed outputs. The framework extends conditionally across multiple adapted layers, with sharper attention bounds obtained from softmax’s invariance to row-wise shifts and the compression imposed by attention weighting and output projections.

**Main result.** The paper proves the existence of a global minimizer whose rank $k$ satisfies $k(k+1)/2\le d_\Phi$, where $d_\Phi=\operatorname{rank}(\Phi)$, and derives refined per-head rank bounds for multilayer attention. Above a bottleneck-dependent factorization threshold, arbitrarily small generic positive-semidefinite perturbations force every first-order stationary point to be rank-deficient, although spurious local minima can remain. It also bounds the suboptimality introduced by perturbation and establishes uniform generalization bounds governed by feature spectra

**Why it matters.** Efficient adaptation of pretrained models is a central problem in making machine learning usable under limited memory and computation. This work provides a structural explanation for when parameter-efficient updates can retain the best regularized solution: the required adaptation capacity depends on the directions the network actually observes, rather than simply its total parameter count. It connects low-rank adaptation to broader questions about representation, regularization, and statistical complexity, while distinguishing the existence of compact solutions from the ability of training algorithms to find them.

## My Contribution

- Surveyed related work on low-rank adaptation and finite-rank bottlenecks, verified proofs and modified papers.
