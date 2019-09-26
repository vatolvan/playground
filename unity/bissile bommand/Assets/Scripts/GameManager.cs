using UnityEngine;

public class GameManager : MonoBehaviour
{
    public bool gameOver = false;
    public GameObject gameOverText;

    private void FixedUpdate()
    {
        if (gameOver) return;

        var numberOfCities = GameObject.FindGameObjectsWithTag("City").Length;
        var numberOfBases = GameObject.FindGameObjectsWithTag("Base").Length;

        if (numberOfCities == 0 || numberOfBases == 0)
        {
            gameOver = true;
            Instantiate(gameOverText, new Vector3(0, 0, 0), Quaternion.Euler(new Vector3(0, 180, 0)));
        }
    }
}
