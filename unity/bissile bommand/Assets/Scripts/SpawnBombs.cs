using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnBombs : MonoBehaviour
{
    public float spawnRateSeconds;
    public GameObject bombPrefab;

    private float _lastSpawn = 0;
    private GameManager _gameManager;

    private void Start()
    {
        _gameManager = GameObject.Find("GameManager").GetComponent<GameManager>();
    }

    // Update is called once per frame
    void Update()
    {
        if (_gameManager.gameOver || !(Time.time - _lastSpawn > spawnRateSeconds)) return;

        SpawnBomb();
        _lastSpawn = Time.time;
    }

    private void SpawnBomb()
    {
        Vector3 randomPosition = GetRandomPosition();
        // Debug.Log("Spawning bomb at " + randomPosition);
        Instantiate(bombPrefab, randomPosition, Quaternion.Euler(new Vector3(0, 0, 180)));
    }

    private static Vector3 GetRandomPosition()
    {
        float r = Random.Range(-5.0f, 5.0f);
        return new Vector3(r, 6, 0);
    }
}