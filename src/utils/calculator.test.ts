import { describe, it, expect } from 'vitest'
import { performCalculation } from './calculator'

describe('performCalculation', () => {
  describe('addition', () => {
    it('should add two positive numbers', () => {
      expect(performCalculation(5, 3, '+')).toBe(8)
    })

    it('should add zero to a number', () => {
      expect(performCalculation(10, 0, '+')).toBe(10)
    })

    it('should add negative numbers', () => {
      expect(performCalculation(-5, -3, '+')).toBe(-8)
    })

    it('should add positive and negative numbers', () => {
      expect(performCalculation(10, -3, '+')).toBe(7)
    })

    it('should add decimal numbers', () => {
      expect(performCalculation(5.5, 2.3, '+')).toBeCloseTo(7.8)
    })

    it('should add large numbers', () => {
      expect(performCalculation(1000000, 2000000, '+')).toBe(3000000)
    })
  })

  describe('subtraction', () => {
    it('should subtract two positive numbers', () => {
      expect(performCalculation(10, 3, '-')).toBe(7)
    })

    it('should subtract zero from a number', () => {
      expect(performCalculation(10, 0, '-')).toBe(10)
    })

    it('should subtract negative numbers', () => {
      expect(performCalculation(-5, -3, '-')).toBe(-2)
    })

    it('should subtract larger number from smaller', () => {
      expect(performCalculation(3, 10, '-')).toBe(-7)
    })

    it('should subtract decimal numbers', () => {
      expect(performCalculation(10.5, 2.3, '-')).toBeCloseTo(8.2)
    })

    it('should subtract and get negative result', () => {
      expect(performCalculation(5, 10, '-')).toBe(-5)
    })
  })

  describe('multiplication', () => {
    it('should multiply two positive numbers', () => {
      expect(performCalculation(5, 3, '*')).toBe(15)
    })

    it('should multiply by zero', () => {
      expect(performCalculation(10, 0, '*')).toBe(0)
    })

    it('should multiply by one', () => {
      expect(performCalculation(10, 1, '*')).toBe(10)
    })

    it('should multiply negative numbers', () => {
      expect(performCalculation(-5, -3, '*')).toBe(15)
    })

    it('should multiply positive and negative numbers', () => {
      expect(performCalculation(5, -3, '*')).toBe(-15)
    })

    it('should multiply decimal numbers', () => {
      expect(performCalculation(2.5, 4.2, '*')).toBeCloseTo(10.5)
    })

    it('should multiply large numbers', () => {
      expect(performCalculation(1000, 2000, '*')).toBe(2000000)
    })
  })

  describe('division', () => {
    it('should divide two positive numbers', () => {
      expect(performCalculation(10, 2, '/')).toBe(5)
    })

    it('should divide by one', () => {
      expect(performCalculation(10, 1, '/')).toBe(10)
    })

    it('should divide negative numbers', () => {
      expect(performCalculation(-10, -2, '/')).toBe(5)
    })

    it('should divide positive by negative', () => {
      expect(performCalculation(10, -2, '/')).toBe(-5)
    })

    it('should divide decimal numbers', () => {
      expect(performCalculation(10, 2.5, '/')).toBe(4)
    })

    it('should handle division resulting in decimal', () => {
      expect(performCalculation(5, 2, '/')).toBe(2.5)
    })

    it('should divide zero by a number', () => {
      expect(performCalculation(0, 5, '/')).toBe(0)
    })

    it('should divide by a very small number', () => {
      expect(performCalculation(1, 0.001, '/')).toBe(1000)
    })
  })

  describe('invalid operations', () => {
    it('should return current value for unknown operation', () => {
      expect(performCalculation(5, 3, 'unknown')).toBe(3)
    })

    it('should return current value for empty operation', () => {
      expect(performCalculation(5, 3, '')).toBe(3)
    })
  })

  describe('edge cases', () => {
    it('should handle very small decimal values', () => {
      expect(performCalculation(0.0001, 0.0001, '+')).toBeCloseTo(0.0002)
    })

    it('should handle operations with zero', () => {
      expect(performCalculation(0, 0, '+')).toBe(0)
      expect(performCalculation(0, 5, '*')).toBe(0)
      expect(performCalculation(0, 0, '-')).toBe(0)
    })
  })
})
